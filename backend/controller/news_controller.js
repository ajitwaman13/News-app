import axios from "axios";
import { statusCodes } from "../utils/statusCode.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 **/
export const AllNews = async (req, res) => {
  console.log("inside all news controller");

  const API_KEY = "40b25f873c6c410497cf43c06a97cb1b";

  


  try {
    // console.log("news api 1");
    const page = parseInt(req.query.page) || 1; 
    const pageSize = parseInt(req.query.pageSize) || 10; 
    const query=req.query.query;
    console.log(query)

    const API = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    const NewsResponse = await axios.get(API);

    if (NewsResponse?.data?.status === "ok") {
      return res.status(statusCodes.OK).json({
        status: "success",
        page,
        pageSize,
        totalResults: NewsResponse.data.totalResults,
        totalPages: Math.ceil(NewsResponse.data.totalResults / pageSize),
        articles: NewsResponse.data.articles,
      });
    } else {
      return res.status(statusCodes.NOT_FOUND).json({
        status: "error",
        message:
          NewsResponse?.data?.message ||
          "External news API returned an error or no data.",
      });
    }
  } catch (error) {
    console.error("Error fetching news:", error.message);

    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An internal server error occurred while fetching news.",
      details: error.message,
    });
  }
};

export default AllNews;
