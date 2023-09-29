import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { RiUserReceivedLine } from "react-icons/ri";

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
        title: "Proveedores",
        icon: <RiUserReceivedLine />,
        path: "/providers",
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
    }

];

export default menu;
