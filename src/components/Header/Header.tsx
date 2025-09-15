import { Link } from 'react-router';
import Logo from '../Logo';
import Text from '../Text';
import HeartIcon from '../icons/HeartIcon/HeartIcon';
import './Header.css'
import UserIcon from '../icons/UserIcon/UserIcon';

const Header = () => (
  <header>
   <div className="left-side">
     <Logo/>
    <div className="links-wrap">
        <Link to="/recipes">
            <Text view='p-16' tag='p' weight='normal' color='primary' className='link-text'>Recipes</Text>
        </Link>
        <Link to="/recipes">
            <Text view='p-16' tag='p' weight='normal' color='primary' className='link-text'>Meal Categories</Text>
        </Link>
        <Link to="/recipes">
            <Text view='p-16' tag='p' weight='normal' color='primary' className='link-text'>Products</Text>
        </Link>
        <Link to="/recipes">
            <Text view='p-16' tag='p' weight='normal' color='primary' className='link-text'>Menu Items</Text>
        </Link>
        <Link to="/recipes">
            <Text view='p-16' tag='p' weight='normal' color='primary' className='link-text'>Meal Planning</Text>
        </Link>
    </div>
   </div>
    <div className="icons-wrap">
        <HeartIcon color='accent' className='heart-icon'/>
        <UserIcon color='accent'/>
    </div>
  </header>
);

export default Header;