import { newsTitle } from "../../sever/sever";


async function fn() {
    let res = await newsTitle("api/news_classify.php")
    console.log(res.data);
}
fn()