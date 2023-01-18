/**
 * Get cute dog pictures from reddit!
 * @param {number} length
 * @returns {Promise<Array<{ title: string, url:string }>}
 */

// Get dogs through fetch API
// Only need title, url, data.children.title,  preview.images.resolutions[2]
export const getDogs = (length = 10) => {
  const limit = 2 * length; // get double the requested posts because some don't have images

  return fetch(`https://www.reddit.com/r/dogswithjobs/.json?limit=${limit}`)
    .then((response) => response.json())
    .then((dataJson) => {
      const dogs = [];
      dataJson.data.children.forEach((dog) => {
        const title = dog.data.title;
        const imageUrl = dog.data.preview?.images[0]?.resolutions[2]?.url;
        if (imageUrl) {
          dogs.push({ title, url: imageUrl.replaceAll("&amp;", "&") });
        }
      });
      return dogs.slice(0, length); // remove the extra dogs
    });
};
