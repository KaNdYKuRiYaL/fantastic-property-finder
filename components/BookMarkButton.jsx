'use client';
import React , {useState , useEffect} from 'react';
import { FaBookmark } from 'react-icons/fa';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const BookMarkButton = ({property}) => {

  const [loading , setLoading] = useState(true);
  const [isBookMarked , setIsBookMarked] = useState(false);

  const {data : session} = useSession();
  const userId = session?.user?.id;

  useEffect(()=>{

    if(!userId){
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((res)=>{
      if(res.error) toast.error(res.error);
      if(res.isBookMarked) setIsBookMarked(res.isBookMarked);
      setLoading(false);
    })

  } , [property._id , userId ,checkBookmarkStatus ]);

  
  const handleClick = async()=>{
    if(!userId){
      toast.error('You need to be signed in to bookmark a listing');
      return;
    }

    bookmarkProperty(property._id).then((res)=>{
      if(res.error) return toast.error(res.error);
      setIsBookMarked(res.isBookMarked);
      toast.success(res.message);
    });

  };


  return isBookMarked? (
    <button className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleClick}>
                    <FaBookmark className="fas fa-bookmark mr-2"></FaBookmark> Remove Bookmark
    </button>
  ) : (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleClick}>
                    <FaBookmark className="fas fa-bookmark mr-2"></FaBookmark> Bookmark Property
    </button>
  );
};

export default BookMarkButton;
