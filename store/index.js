import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get('/posts.json')
          .then(data => {
            const postsArray = [];
            for (const key in data) {
              postsArray.push({ ...data[key], id: key });
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
        this.$axios
          .$post('/posts.json?auth=' + vuexContext.state.token, {
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
        this.$axios
          .$put(
            '/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token,
            editedPost
          )
          .then(res => {
            vuexContext.commit('editPost', editedPost);
          })
          .catch(e => console.log(e));
      },
      authenticateUser(vuexContext, authData) {
        let authUrl =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
          process.env.fbAPIKey;
        if (!authData.isLogin) {
          authUrl =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
            process.env.fbAPIKey;
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            vuexContext.commit('setToken', result.idToken);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        console.log('is Authenticated');
        return state.token != null;
      }
    }
  });
};

export default createStore;
