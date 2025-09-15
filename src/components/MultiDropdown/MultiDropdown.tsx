import React, { useState, useRef, useEffect } from 'react';
import Input from '../Input/Input';
import ArrowDownIcon from '../icons/ArrowDownIcon/ArrowDownIcon';
import styles from './MultiDropdown.module.css';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className = '',
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.value.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchValue, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchValue('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
      setSearchValue('');
    }
  };

  const handleArrowClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchValue('');
    }
  };

  const handleInputChange = (newValue: string) => {
    setSearchValue(newValue);
    if (!isOpen && newValue) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
      setSearchValue('');
    }
  };

  const handleOptionClick = (option: Option) => {
    const isSelected = value.some(selected => selected.key === option.key);
    let newValue: Option[];

    if (isSelected) {
      newValue = value.filter(selected => selected.key !== option.key);
    } else {
      newValue = [...value, option];
    }

    onChange(newValue);
    setSearchValue('');
  };

  const isOptionSelected = (option: Option) => {
    return value.some(selected => selected.key === option.key);
  };

  const title = getTitle(value);
  const inputPlaceholder = isOpen ? '' : (value.length === 0 ? title : '');
  const inputValue = isOpen ? searchValue : (value.length > 0 ? title : '');

  return (
    <div className={`${styles.dropdown} ${className} ${disabled ? styles.disabled : ''}`} ref={dropdownRef}>
      <div className={styles.dropdownContainer}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          placeholder={inputPlaceholder}
          disabled={disabled}
          afterSlot={
            <div 
              className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ''}`}
              onClick={handleArrowClick}
              style={{ cursor: disabled ? 'default' : 'pointer' }}
            >
              <ArrowDownIcon color="secondary" />
            </div>
          }
        />
        
        {isOpen && !disabled && (
          <div className={styles.optionsList}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option.key}
                  className={`${styles.option} ${isOptionSelected(option) ? styles.optionSelected : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.value}
                </div>
              ))
            ) : (
              <div className={styles.option}>Ничего не найдено</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiDropdown;