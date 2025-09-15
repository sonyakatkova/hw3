import { Link } from 'react-router';
import LogoSvg from './LogoSvg';
import Text from '../Text';
import './Logo.css'

const Logo = () => {
    return(
        <Link to="/recipes">
            <div className="logo-wrapper">
            <LogoSvg/>
            <Text view='p-20' tag='p' weight='bold' color='primary'>Food Client</Text>
        </div>
        </Link>
        
    )
}
export default Logo;