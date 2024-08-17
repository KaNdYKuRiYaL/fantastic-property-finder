'use server';
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId){
    await connectDB();

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId){
        throw new Error ('User id is required');
    }
    const {userId} = sessionUser;

    const user = await User.findById(userId);
    let isBookMarked = user.bookmarks.includes(propertyId);
    
    return {isBookMarked};

}
export default checkBookmarkStatus;