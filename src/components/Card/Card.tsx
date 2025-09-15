import React from 'react';
import Text from '../Text/Text';
import './Card.css'
import ClockIcon from '../icons/ClockIcon/ClockIcon';

export type CardProps = {
    className?: string,
    image: string;
    captionSlot?: React.ReactNode;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    contentSlot?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
    className,
    image,
    captionSlot,
    title,
    subtitle,
    contentSlot,
    onClick,
    actionSlot,
}) => {
    return(
       <div className={className} onClick={onClick}>
         <div className='card-wrap' >
            <img className='card-image' src={image} alt="Изображение товара" />
            <div className="text-wrap">
                {captionSlot && (
                    <div className="caption-slot">
                        <ClockIcon className='clock'/>
                    <Text view='p-14' tag='p' weight='normal' color='secondary'>
                        {captionSlot}
                    </Text>
                    </div>
                )}
                <Text view='p-20' tag='p' weight='normal' color='primary' maxLines={2}>{title}</Text>
                <Text view='p-16' tag='p' weight='normal' color='secondary' maxLines={3}>{subtitle}</Text>
            </div>
             <div className="content-wrap">
                {contentSlot && (
                    <div className="content-slot">
                        {contentSlot}
                    </div>
                )}
                
                {actionSlot && (
                    <div className="action-slot">
                        {actionSlot}
                    </div>
                )}
             </div>

        </div>
       </div>
    )
};

export default Card;
