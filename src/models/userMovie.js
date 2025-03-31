import mongoose from "mongoose";

const userMovieSchema = new mongoose.Schema({ 
    user_id: {
        type: String,
        required: true,
        ref: 'User' //Reference user by UUID
    }, 
    movie_id: {
        type: String,
        required: true,
        ref: 'Movie' //Reference user by UUID
    },

    rating: {
        type: Number
    }
   
  }, { timestamps: true }); 
   

  const UserMovie = mongoose.model("UserMovie", userMovieSchema);
  export default UserMovie;