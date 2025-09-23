'use server';

import { getUserToken } from 'src/getUserToken';
import { WishlistData } from 'src/types/wishlist.type';


export async function getWishlistData(){
    const token = await getUserToken()
    if(!token){
        throw new Error("token Error")
    }
    const res = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
        {
            headers:{
                token:token as string
            }       
        }
    ) 
    const data: WishlistData = await res.json()
    return data
}

// إضافة منتج للمفضلة - بنفس طريقة الكارت
export async function addToWishlist(id: string) {
  const token  = await getUserToken();
   if (!token) {
      throw new Error("token Error");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
      method: "POST",
      headers: {
        token: token as string, 
        "Content-Type": "application/json",
      },
      body:JSON.stringify({ productId:id }),
    });

    const data = await res.json();
    return data;
}


// إزالة منتج من المفضلة - بنفس طريقة الكارت
export async function removeFromWishlist(id: string) {
  try {
    const token = await getUserToken();
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,
        {
            method:"delete",
            headers:{
                token:token as string
            }

        }
  );
    
    const data = await res.json();
   
    return data;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return { status: "error", message: "Failed to remove from wishlist" };
  }
};


