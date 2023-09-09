import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
    {
        title: "Dashboard",
        icon: <FaTh />,
        path: "/dashboard",
    },
    {
        title: "Anadir Producto",
        icon: <BiImageAdd />,
        path: "/add-product",
    },
    {
        title: "Cuenta",
        icon: <FaRegChartBar />,
        childrens: [
            {
                title: "Perfil",
                path: "/profile",
            },
            {
                title: "Editar perfil",
                path: "/edit-profile",
            },
        ],
    },
    {
        title: "Reporte de Bug",
        icon: <FaCommentAlt />,
        path: "/contact-us",
    },
];

export default menu;
