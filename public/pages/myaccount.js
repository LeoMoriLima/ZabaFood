import AdminAccountPage from "../components/AdminAccountPage.js";
import HeaderMain from "../components/HeaderMain.js";
import FooterMain from "../components/FooterMain.js";

export default async () =>{
    const page = document.createElement("div");
    page.appendChild(await HeaderMain());
    const userType = await getUserType();
    if (userType === "admin"){
        page.appendChild(await AdminAccountPage());
    }// else if(userType === "user"){
    //     page.appendChild()
    // }
    page.appendChild(FooterMain())

    return page;
}

async function getUserType() {
    try{
        const response = await fetch('/api/login', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data.user.user_type;
    } catch(error){
        throw new Error ("Erro ao fazer requisição");
    }
}