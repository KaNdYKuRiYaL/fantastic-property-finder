import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

export const POST  = async(request)=>{
    try{
        await connectDB();
        const {propertyId} = await request.json();
        const sessionUser = await getSessionUser();

        if(!session || !session.userId){
            return new Response('User id is required' , {status:401});

        }
        const {userId} = sessionUser;
        // find user in database
        const user = await User.findOne({_id:userId});
        // check is property is bookmarked
        let isBookMarked = user.bookmarks.include(propertyId);

        let message;
        if(isBookMarked){
            // already bookmarked
            user.bookmarks.pull(propertyId);
            message='Bookmark removed succesfully';
            isBookMarked = false;
        }
        else{
            user.bookmarks.push(propertyId);
            message='Bookmark added successfully'
            isBookMarked = true;
        }
        await user.save();
        return new Response(JSON.stringify({message , isBookMarked}),{status:200});
    }
    catch(err){
        console.log(err);
        return new Response('Something went wrong' , {status : 500});
    }
}