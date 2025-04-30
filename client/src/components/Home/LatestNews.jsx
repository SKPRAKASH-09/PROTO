import React, { useEffect, useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Fixed import (case-sensitive)

const LatestNews = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [Data, setData] = useState([]); // Initialized as an empty array

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${backendLink}/api/v1/fetchLatestNews`, {
          withCredentials: true,
        });
        setData(res.data.blogs);
      } catch (error) {
        console.log('Error fetching latest news:', error);
      }
    };
    fetch();
  }, [backendLink]); // Added backendLink as a dependency

  return (
    <div className="mb-4 py-4"> {/* Fixed className */}
      <h1 className="text-xl font-semibold mb-4">Latest News</h1> {/* Fixed className */}
      <div className="flex flex-col gap-8 lg:gap-12"> {/* Fixed className */}
        {Data &&
          Data.map((items, i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-4"> {/* Fixed className */}
              <NewsCard items={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default LatestNews;