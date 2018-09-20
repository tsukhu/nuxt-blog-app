<template>
    <div class="posts-page">
      <PostList :posts="loadedPosts"/>
    </div>
</template>

<script>
import PostList from '@/components/Posts/PostList';
export default {
  components: {
    PostList
  },
  asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
            {
              id: '1',
              title: 'First Post',
              previewText: 'This is our first post!',
              thumbnail:
                'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg'
            },
            {
              id: '2',
              title: 'Second Post',
              previewText: 'This is our first post!',
              thumbnail:
                'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg'
            },
            {
              id: '3',
              title: 'Third Post',
              previewText: 'This is our first post!',
              thumbnail:
                'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg'
            }
          ]
        });
      }, 1500);
    })
      .then(data => {
        return data;
      })
      .catch(e => {
        context.error(new Error());
      });
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

