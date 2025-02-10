import React from 'react';
const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Section with ID "${sectionId}" not found.`);
    }
  };
  
  const Navbar = ({ onCategoryClick }) => (
    <nav style={navbarStyle} data-testid="links">
      <div style={filterContainerStyle}>
        <ul style={navLinksStyle}>
          {[
            { id: 'all', label: 'All', category: '' },
            { id: 'milk', label: 'Milk', category: 'Milk' },
            { id: 'curd', label: 'Curd', category: 'Curd' },
            { id: 'yogurt', label: 'Yogurt', category: 'Yogurt' },
            { id: 'cheese', label: 'Cheese', category: 'Cheese' },
            { id: 'paneer', label: 'Paneer', category: 'Paneer' },
            { id: 'butter', label: 'Butter', category: 'Butter' },
            { id: 'cream', label: 'Cream', category: 'Cream' },
            { id: 'ghee', label: 'Ghee', category: 'Ghee' },
            { id: 'buttermilk', label: 'Buttermilk', category: 'Buttermilk' },
          ].map(({ id, label, category }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                style={linkStyle}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  onCategoryClick(category);
                  handleScrollToSection('images-section');
                }}
                aria-label={`Filter by ${label}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
  
  const navbarStyle = {
    marginTop: '10px',
  };
  
  const filterContainerStyle = {
    backgroundColor: 'lightblue',
    padding: '10px 0',
    borderRadius: '8px',
    width: '100%',
    marginBottom: '10px',
  };
  
  const navLinksStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: '100%',
  };
  
  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '1rem',
  };
  
  export default Navbar;
  