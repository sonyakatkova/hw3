import { useState, useEffect } from 'react'
import qs from 'qs';
import axios from 'axios'
import Text from '../../../components/Text'
import Card from '../../../components/Card'
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import SearchIcon from '../../../components/icons/SearchIcon/SearchIcon';
import MultiDropdown from '../../../components/MultiDropdown/MultiDropdown';
import Pagination from './components/Pagination/Pagination';
import './Recipes.css'
import { useNavigate } from 'react-router';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;
const API_TOKEN = 'f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef'; 

interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats: {
    small: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    medium: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    thumbnail: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images: Image[];
}

interface Recipe {
  id: number;
  documentId: string;
  name: string;
  summary: string;
  totalTime: number;
  calories: number;
  cookingTime?: number;
  preparationTime?: number;
  servings?: number;
  rating?: number;
  likes?: number;
  vegetarian?: boolean;
  images?: Image[];
}


const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [recipesPerPage] = useState(9);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('recipesCurrentPage');
    return savedPage ? parseInt(savedPage) : 1;
  });
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const query = qs.stringify({
          populate: ['images']
        }, {
          encodeValuesOnly: true
        });

        const response = await axios.get(`${STRAPI_URL}/recipes?${query}`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        setRecipes(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке рецептов');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

 const handleRecipeClick = (recipe: Recipe) => {
  navigate(`/recipes/${recipe.documentId}`);

};

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  useEffect(() => {
    localStorage.setItem('recipesCurrentPage', currentPage.toString());
  }, [currentPage]);


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='recipes-page'>
      <img src="../../../../public/images/recipesimg.jpg" alt="Recipes" className="recipes-banner"/>
      <div className="main-content-wrap">
        <Text view='p-20' tag='h5' weight='normal' color='primary' className='caption-text'>
          Find the perfect food and drink ideas for every occasion, from weeknight dinners to holiday feasts.
        </Text>
        
        <div className="search-wrap">
          <Input className='search-input' placeholder='Enter dishes' value={inputValue} onChange={setInputValue}/>
          <Button className='search-button'>
            <SearchIcon/>
          </Button>
        </div>
        
        <MultiDropdown
          className='categories'
          options={[
            { key: 'c1', value: 'Category 1' },
            { key: 'c2', value: 'Category 2' },
            { key: 'c3', value: 'Category 3' }
          ]}
          value={[{ key: 'msk', value: 'Москва' }]}
          onChange={() => console.log('Выбрано')}
          getTitle={() => ''}
        />

        <div className="recipes-list">
          <div className="recipes-list-wrap">
            {currentRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="recipe-card"
                image={recipe.images && recipe.images.length > 0 
                  ? recipe.images[0].url 
                  : 'undefined'}
                captionSlot={`${recipe.totalTime} minutes`} 
                title={recipe.name}
                subtitle={<div 
                      className="recipe-summary"
                      dangerouslySetInnerHTML={{ __html: recipe.summary }}
                    />} 
                contentSlot={`${recipe.calories} ccal`}
                actionSlot={<Button>Save</Button>}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
        </div>
        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Recipes;