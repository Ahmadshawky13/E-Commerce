"use client"
import React, { useState } from "react"
import { toast } from "sonner"
import { addToWishlist, removeFromWishlist } from "src/app/WishListAction/WishListAction"
import { Button } from "src/components/ui/button"

export default function AddWishlistBtn({ id }: { id: string }) {
  const [added, setAdded] = useState(false)

  async function toggleWishlist(productId: string) {
    try {
      if (!added) {
        // ✅ إضافة للويش ليست
        const data = await addToWishlist(productId)
        if (data.status === "success") {
          toast.success(data.message, { position: "top-center" })
          setAdded(true)
        } else {
          toast.error("Incorrect Item", { position: "top-center" })
        }
      } else {
        // ❌ إزالة من الويش ليست
        const data = await removeFromWishlist(productId)
        if (data.status === "success") {
          toast.success("Product removed from wishlist!", {
            position: "top-center",
          })
          setAdded(false)
        } else {
          toast.error("Failed to remove item", { position: "top-center" })
        }
      }
    } catch (err) {
      toast.error("You need to login first!", { position: "top-center" })
    }
  }

  return (
    <Button
      onClick={() => toggleWishlist(id)}
      className={`bg-transparent p-1 sm:p-2 rounded-full ${
        added ? "text-green-500" : "text-red-500 hover:text-green-500 hover:bg-white"
      }`}
      size="sm"
    >
      <i className="fa fa-heart text-lg sm:text-xl"></i>
    </Button>
  )
}