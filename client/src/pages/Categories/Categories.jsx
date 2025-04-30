import React, { useEffect, useState} from 'react'
import NewsCard from '../../components/NewsCard/NewsCard'
import { useSelector } from 'react-redux';
import axios from "axios";

const Categories = () => {
    const backendLink = useSelector((state) => state.prod.link);
        const [Data, setData] = useState()
        const {id} = useParams();
          useEffect(() => {
            const fetch = async() => {
              const res = await axios.get(`${backendLink}/api/v1/getCategoriesById/${id}`, {
                withCredentials:true
              });
              setData(res.data.blogs);
            }
            fetch();
          },[])
  return (
    <div className="flex flex-col gap-8 lg:gap-4">
        {data && data.map((items,i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                <NewsCard items ={items} />
            </div>
        ) )}
    </div>
  )
}

export default Categories