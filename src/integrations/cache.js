import redisClient from "../integrations/redis.js";

const cacheGetAllBlogs = async (req, res) => {
  const query = req.query;
  const whereQuery = {};
  const limit = query.per_page || 10;
  const page = query.page || 0;

  if (query.name) {
    whereQuery.name = query.name;
  }

  if (query.email) {
    whereQuery.email = query.email;
  }

  // check cache
  const cacheKey = `/blogs:$(JSON.stringify(whereQuery)):${limit}:${page}`;

  // get data from database
  const data = await redisClient.get(cacheKey);

  if (data) {
    console.log("Data from cache");
    return res.json({
      data: JSON.parse(data),
      error: null,
    });
  }

  // cache miss
  console.log("Data from database");
  const blogs = await BlogModel.find(whereQuery)
    .limit(limit)
    .skip(page)
    .exec();

  // set data in cache
  await redisClient.setEx(cacheKey, 1 * 60, JSON.stringify(blogs));
  return res.json({
    blogs,
  });
};

export default cacheGetAllBlogs;
