import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { BsBox2 } from "react-icons/bs";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { IoMdStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaCirclePlus } from "react-icons/fa6";
import { GoDash } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { CgOptions } from "react-icons/cg";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { BiImageAdd } from "react-icons/bi";
import {
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
  logo,
  defaultProfilePic,
  profilePic,
  allFoodImage,
  chineseFoodImage,
  snacksImage,
  beveragesImage,
  saladsImage,
  mealsImage,
  nonVegImage,
  vegImage,
} from "../assets/index";

export {
  FaEye,
  FaEyeSlash,
  IoSearchSharp,
  LuShoppingCart,
  IoLogOutOutline,
  IoMenu,
  RxCross2,
  CiUser,
  FaRegUser,
  BsBox2,
  BsBoxArrowInLeft,
  IoMdStar,
  GoDotFill,
  LiaRupeeSignSolid,
  FaCirclePlus,
  GoDash,
  GoPlus,
  MdCancel,
  FaArrowRight,
  CgOptions,
  RiHomeFill,
  IoIosArrowUp,
  IoIosArrowDown,
  BiImageAdd,
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
  logo,
  defaultProfilePic,
  profilePic,
  allFoodImage,
  chineseFoodImage,
  snacksImage,
  beveragesImage,
  saladsImage,
  mealsImage,
  nonVegImage,
  vegImage,
};

export const menuLinks = [
  {
    id: "home",
    icon: RiHomeFill,
    link: "/",
  },
  {
    id: "myProfile",
    icon: FaRegUser,
    link: "/profile",
  },
  {
    id: "orders",
    icon: BsBox2,
    link: "/orders",
  },
  // {
  //   id: "Logout",
  //   icon: BsBoxArrowInLeft,
  //   link: "/logout",
  //   onclick: handleLogout,
  // },
];

export const categoryItems = [
  {
    id: "All",
    image: allFoodImage,
  },
  {
    id: "Snacks",
    image: snacksImage,
  },
  // {
  //   id: "Chinese",
  //   image: chineseFoodImage,
  // },

  {
    id: "Salads",
    image: saladsImage,
  },
  {
    id: "mealsImage",
    image: mealsImage,
  },
  {
    id: "Bevarages",
    image: beveragesImage,
  },
  {
    id: "Non Veg",
    image: nonVegImage,
  },
  {
    id: "Veg",
    image: vegImage,
  },
];

export const foodItems = [
  {
    productId: "4f3bcabf-c7ad-4514-87b5-8e9de8c53939",
    productName: "Fresh Orange Juice",
    image: "fresh_orange_juice.jpg",
    rating: "5.1",
    description: "Pure and natural orange juice",
    vegetarian: 1,
    price: 80,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217928953",
    updatedAt: "1705217928953",
  },
  {
    productId: "67cbe993-bedc-4f34-a4c9-4f2b86bb345d",
    productName: "Strawberry Smoothie",
    image: "strawberry_smoothie.jpg",
    rating: "5.1",
    description: "Creamy blend of fresh strawberries and yogurt",
    vegetarian: 1,
    price: 150,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217945234",
    updatedAt: "1705217945234",
  },
  {
    productId: "af336699-baf7-48a2-991a-395311c03c73",
    productName: "Cold Brew Coffee",
    image: "cold_brew_coffee.jpg",
    rating: "5.1",
    description: "Smooth and refreshing cold brew coffee",
    vegetarian: 1,
    price: 120,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217917276",
    updatedAt: "1705217917276",
  },
  {
    productId: "e33971fb-c18d-4676-a55e-634632cc09b4",
    productName: "Iced Lemon Tea",
    image: "iced_lemon_tea.jpg",
    rating: "5.1",
    description: "Cool and tangy iced lemon-flavored tea",
    vegetarian: 1,
    price: 90,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217953400",
    updatedAt: "1705217953400",
  },
  {
    productId: "eeb6a9e0-11d8-4256-9778-f9e0f6b18406",
    productName: "Mint Mojito",
    image: "mint_mojito.jpg",
    rating: "5.1",
    description: "Refreshing minty lime drink",
    vegetarian: 1,
    price: 100,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217937237",
    updatedAt: "1705217937237",
  },
  {
    productId: "e33971fb-c18d-4676-a55e-634632cc09b4",
    productName: "Iced Lemon Tea",
    image: "iced_lemon_tea.jpg",
    rating: "5.1",
    description: "Cool and tangy iced lemon-flavored tea",
    vegetarian: 1,
    price: 90,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217953400",
    updatedAt: "1705217953400",
  },
  {
    productId: "e33971fb-c18d-4676-a55e-634632cc09b4",
    productName: "Iced Lemon Tea",
    image: "iced_lemon_tea.jpg",
    rating: "5.1",
    description: "Cool and tangy iced lemon-flavored tea",
    vegetarian: 1,
    price: 90,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217953400",
    updatedAt: "1705217953400",
  },
  {
    productId: "e33971fb-c18d-4676-a55e-634632cc09b4",
    productName: "Iced Lemon Tea",
    image: "iced_lemon_tea.jpg",
    rating: "5.1",
    description: "Cool and tangy iced lemon-flavored tea",
    vegetarian: 1,
    price: 90,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217953400",
    updatedAt: "1705217953400",
  },
  {
    productId: "e33971fb-c18d-4676-a55e-634632cc09b4",
    productName: "Iced Lemon Tea",
    image: "iced_lemon_tea.jpg",
    rating: "5.1",
    description: "Cool and tangy iced lemon-flavored tea",
    vegetarian: 1,
    price: 90,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217953400",
    updatedAt: "1705217953400",
  },
  {
    productId: "e33971fb-c18d-4676-a55e-634632cc09b4",
    productName: "Iced Lemon Tea",
    image: "iced_lemon_tea.jpg",
    rating: "5.1",
    description: "Cool and tangy iced lemon-flavored tea",
    vegetarian: 1,
    price: 90,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217953400",
    updatedAt: "1705217953400",
  },
  {
    productId: "e33971fb-c18d-4676-a55e-634632cc09b4",
    productName: "Iced Lemon Tea",
    image: "iced_lemon_tea.jpg",
    rating: "5.1",
    description: "Cool and tangy iced lemon-flavored tea",
    vegetarian: 1,
    price: 90,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217953400",
    updatedAt: "1705217953400",
  },
  {
    productId: "e33971fb-c18d-4676-a55e-634632cc09b4",
    productName: "Iced Lemon Tea",
    image: "iced_lemon_tea.jpg",
    rating: "5.1",
    description: "Cool and tangy iced lemon-flavored tea",
    vegetarian: 1,
    price: 90,
    categoryId: "5d3fb46c-5628-4826-bf98-a6ef902c9287",
    createdAt: "1705217953400",
    updatedAt: "1705217953400",
  },
];
