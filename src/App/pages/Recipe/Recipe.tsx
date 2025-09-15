import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import qs from 'qs';
import axios from 'axios';
import Text from '../../../components/Text';
import './Recipe.css'
import '../../../../public/images/Pattern.png'
import ArrowBackIcon from '../../../components/icons/ArrowBackIcon/ArrowBackIcon';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;
const API_TOKEN = 'f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef'; // твой токен

interface Image {
  id: number;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
}

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

interface Equipment {
  id: number;
  name: string;
}

interface Direction {
  id: number;
  description: string;
  image?: {
    id: number;
    url: string;
  } | null;
}

interface Category {
  id: number;
  title?: string;
}

interface RecipeData {
  id: number;
  documentId?: string;
  name: string;
  summary: string;
  totalTime?: number;
  cookingTime?: number;
  preparationTime?: number;
  servings?: number;
  likes?: number;
  rating?: number;
  vegetarian?: boolean;
  calories?: number;
  images?: Image[];
  ingradients?: Ingredient[]; 
  equipments?: Equipment[];
  directions?: Direction[];
  category?: Category;
}

const Recipe = () => {
  const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const handleBackClick = () => {
    navigate(-1); 
  };

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const query = qs.stringify({
          populate: {
            images: true,
            ingradients: true,
            equipments: true,
            directions: {
              populate: ['image'],
            },
            category: true,
          }
        }, { encodeValuesOnly: true });

        const response = await axios.get(`${STRAPI_URL}/recipes/${id}?${query}`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`
          }
        });
        setRecipe(response.data.data as RecipeData);
        setLoading(false);
      } catch (err: any) {
        setError('Ошибка при загрузке рецепта');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="recipe-page">
      <div className="main-content-wrap">
      <div className="heading">
         <ArrowBackIcon 
            onClick={handleBackClick} 
            style={{ cursor: 'pointer' }}
          />
      <Text view="title" tag="h1" weight="bold" color="primary" className='recipe-title'>
        {recipe.name}
      </Text>
      </div>
      <img src='../../../../public/images/Pattern.png' className='bg-pattern' />
      <div className="pic-and-props">
          {recipe.images && recipe.images.length > 0 && (
          <img src={recipe.images[0].url} alt={recipe.name} className='recipe-pic' />
        )}
        <div className="dish-props-wrap">
          <div className="prop-wrap">
            <Text view='p-16' tag='p' weight='normal'>Preparation</Text>
            <Text view='p-16' tag='p' weight='bold' color='accent'>{recipe.preparationTime ?? '–'} minutes</Text>
          </div>
          <div className="prop-wrap">
            <Text view='p-16' tag='p' weight='normal'>Cooking</Text>
            <Text view='p-16' tag='p' weight='bold' color='accent'>{recipe.cookingTime ?? '–'} minutes</Text>
          </div>
          <div className="prop-wrap">
            <Text view='p-16' tag='p' weight='normal'>Total</Text>
            <Text view='p-16' tag='p' weight='bold' color='accent'>{recipe.totalTime ?? '–'} minutes</Text>
          </div>
          <div className="prop-wrap">
            <Text view='p-16' tag='p' weight='normal'>Likes</Text>
            <Text view='p-16' tag='p' weight='bold' color='accent'>{recipe.likes ?? '–'}</Text>
          </div>
          <div className="prop-wrap">
            <Text view='p-16' tag='p' weight='normal'>Servings</Text>
            <Text view='p-16' tag='p' weight='bold' color='accent'>{recipe.servings ?? '–'} servings</Text>
          </div>
          <div className="prop-wrap">
            <Text view='p-16' tag='p' weight='normal'>Ratings</Text>
            <Text view='p-16' tag='p' weight='bold' color='accent'>{recipe.rating ?? '–'} / 5</Text>
          </div>
        </div>
      </div>
      <div className="summary-container">
        <Text view='p-16' tag='p' weight='normal'><div className="summary-text" dangerouslySetInnerHTML={{ __html: recipe.summary }} /></Text>
      </div>
      
      <div className="ing-and-equip">
          <div className='ingredients'>
            <div className="round"></div>
            <h2>Ingredients</h2>
           <div className="list">
             <ul>
              {recipe.ingradients?.map((ing, i) => (
                <li key={i}>{ing.name} — {ing.amount} {ing.unit}</li>
              )) ?? <li>No engredients</li>}
            </ul>
           </div>
          </div>
          <div className='equipment'>
            <h2>Equipment</h2>
            <div className="list">
              <ul>
              {recipe.equipments?.map((eq, i) => (
                <li key={i}>{eq.name}</li>
              )) ?? <li>No equipment</li>}
            </ul>
            </div>
          </div>
      </div>
      <div className="directions-container">
  <h2>Directions</h2>
  <ol className="directions-list">
    {recipe.directions?.map((dir, i) => (
      <li key={i} className="direction-step">
        <div className="step-header">
          <span className="step-number">Step {i + 1}</span>
        </div>
        <div className="step-content">
          <p className="step-description">{dir.description}</p>
          {dir.image && (
            <img 
              src={dir.image.url} 
              alt={`Step ${i + 1}`} 
              className="step-image"
            />
          )}
        </div>
      </li>
    )) ?? <li className="direction-step">No directions</li>}
  </ol>
</div>
    </div>
    </div>
  );
};

export default Recipe;
