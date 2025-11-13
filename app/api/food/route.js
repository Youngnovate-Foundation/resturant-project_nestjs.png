import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const food ={
        name: "Fried Rice and Chicken",
        image: "/fried_rice.jpg",
        packages: [
          {id: 1, name: "Small Pack", price: 100 },
          {id: 2, name: "Medium Pack", price: 150 },
          {id: 3, name: "Large Pack", price: 200 }
        ]
    };
    
    
    return NextResponse.json(food)
}