<template>
    <section class="post-list">
      <PostPreview 
        id="1"
        :is-admin="isAdmin" 
        thumbnail="https://images.pexels.com/photos/96381/pexels-photo-96381.jpeg?cs=srgb&dl=abstract-art-blur-96381.jpg&fm=jpg"
        title="Hello there"
        previewText="This is my first post"/>
      <PostPreview 
        id="2"
        :is-admin="isAdmin" 
        thumbnail="https://images.pexels.com/photos/96381/pexels-photo-96381.jpeg?cs=srgb&dl=abstract-art-blur-96381.jpg&fm=jpg"
        title="Hello there one more"
        previewText="This is my first post"/>
      <PostPreview 
        id="3"
        :is-admin="isAdmin"  
        thumbnail="https://images.pexels.com/photos/96381/pexels-photo-96381.jpeg?cs=srgb&dl=abstract-art-blur-96381.jpg&fm=jpg"
        title="Hello there more"
        previewText="This is my new post!"/>
    </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview';
export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>