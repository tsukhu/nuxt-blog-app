import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedpost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedpost;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get(process.env.baseUrl + '/posts.json')
          .then(res => {
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }
            vuexContext.commit('setPosts', postsArray);
          })
          .catch(e => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        axios
          .post(process.env.baseUrl + '/posts.json', {
            ...createdPost
          })
          .then(result => {
            vuexContext.commit('addPost', {
              ...createdPost,
              id: result.data.name
            });
          })
          .catch(error => console.log(error));
      },
      editPost(vuexContext, post) {
        const editedPost = {
          ...post,
          updatedDate: new Date()
        };
        axios
          .put(
            process.env.baseUrl + '/posts/' + editedPost.id + '.json',
            editedPost
          )
          .then(res => {
            vuexContext.commit('editPost', editedPost);
          })
          .catch(e => console.log(e));
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
