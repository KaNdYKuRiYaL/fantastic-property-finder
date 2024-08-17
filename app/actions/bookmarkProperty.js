'use server';
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId){
    await connectDB();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId){
        throw new Error ('User id is required');
    }
    const {userId} = sessionUser;

    const user = await User.findById(userId);
    let isBookMarked = user.bookmarks.includes(propertyId);
    let message;

    if(isBookMarked){
        // remove it
        user.bookmarks.pull(propertyId);
        message = 'Bookmark removed';
        isBookMarked = false;
    }
    else{
        // add it
        user.bookmarks.push(propertyId);
        message = 'Bookmark added';
        isBookMarked = true;
    }
    await user.save();
    revalidatePath('/property/saved' , 'page');
    return {
        message,
        isBookMarked,
    };    
}
export default bookmarkProperty;