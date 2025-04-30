import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Added missing import
import axios from 'axios';

const Categories = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [Cat, setCat] = useState([]); // Initialized as an empty array

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${backendLink}/api/v1/getCategory`, {
          withCredentials: true,
        });
        setCat(res.data.categories);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };
    fetch();
  }, [backendLink]);

  return (
    <div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> {/* Fixed className */}
        {Cat &&
          Cat.map((items, i) => (
            <Link
              className="px-4 py-2 text-center text-normal md:text-xl font-semibold bg-green-200 rounded" // Fixed className
              key={i}
              to={`/cat/${items._id}`}
            >
              {items.title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Categories;