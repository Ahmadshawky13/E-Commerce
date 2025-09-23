'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import AddCartBtn from 'src/app/_component/AddBtn/AddCartBtn'
import { getWishlistData, removeFromWishlist } from 'src/app/WishListAction/WishListAction'
import { Button } from 'src/components/ui/button'
import { wishlist, WishlistData } from 'src/types/wishlist.type'

export default function Wishlist() {
  const [wishlistLoading, setWishlistLoading] = useState(false)
  const [Wishlist, setWishlist] = useState<WishlistData>()

  useEffect(() => {
    getAllWishlistData()
  }, [])

  async function getAllWishlistData() {
    setWishlistLoading(true)
    const data: WishlistData = await getWishlistData()
    setWishlist(data)
    setWishlistLoading(false)
  }

  async function deleteProduct(id: string) {
    const data = await removeFromWishlist(id)
    if (data.status == 'success') {
      toast.success('Product removed from wishlist!', { position: 'top-center' })
      setWishlist(data.data)
      getAllWishlistData()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist ❤️</h1>

      {wishlistLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {Wishlist?.data?.length ? (
            <>
              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Wishlist.data.map((item: wishlist) => (
                  <div
                    key={item._id}
                    className="border rounded-2xl p-4 shadow-sm flex flex-col items-center text-center bg-white dark:bg-gray-800"
                  >
                    <Image
                      src={item.imageCover}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="rounded-xl mb-4 object-contain"
                    />
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.brand?.name}</p>
                    <p className="text-red-500 font-bold mt-2">
                      {item.priceAfterDiscount ?? item.price}$
                    </p>
                    <div className="flex gap-2 mt-4">
                      <AddCartBtn id={item._id} />
                      <Button
                        onClick={() => deleteProduct(item._id)}
                        variant="destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 text-lg">Your wishlist is empty 💔</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
