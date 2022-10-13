import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import PointText from '../components/text/PointText';
import Text from '../components/text/Text';
import Title from '../components/text/Title';
import { getSingleMeal } from './meals/[id]';
import classes from './savedMeals.module.scss';

// getStaticProps
export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`);
  const data = await res.json();
  
  return{
    props: {recipes: data.recipes}
  }
}

function SavedMeals({recipes}) {
  const [savedMealsId, setSavedMealsId] = useState([]);

  const queries = savedMealsId.map((id) => (
    {
      queryKey: ['singleMeal', id],
      queryFn: getSingleMeal,
    }
  ));

  const result = useQueries({ queries });

  useEffect(() => {
    if (localStorage.getItem('savedMeals')) {
      setSavedMealsId(JSON.parse(localStorage.getItem('savedMeals')));
    }
  }, []);

  return (
    <div className={classes.pageWrapper}>
      <Title variant="primary" className={classes.pageTitle}>My Saved Meal List</Title>
      <div className={classes.list_container}>
        {savedMealsId.length <= 0 && <Text>You have no saved meals</Text>}
        {result && result.map(({ data, isLoading }, index) => {
          if (isLoading) {
            return (
              <BeatLoader key={savedMealsId[[index]]} color="#fff" loading={isLoading} size={20} />
            );
          }

          return (
            <>
            <div>
              {recipes.map(recipe => (
                <p>{recipe.food}</p>
              ))}
            </div>
            <Link href={`/meals/${data.idMeal}`} key={data.idMeal}>
              <a className={classes.singleMeal}>
                <Title variant="secondary" className={classes.mealTitle}>{data.strMeal}</Title>
                <PointText>
                  Category:
                  {' '}
                  {data.strCategory}
                </PointText>
                <PointText>
                  Area:
                  {' '}
                  {data.strArea}
                </PointText>
              </a>
            </Link>
            </>
          );
        })}
      </div>
    </div>

  );
}

export default SavedMeals;
