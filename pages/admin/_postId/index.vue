<template>
    <div class="admin-post-page">
         <section class="update-form">
             <AdminPostForm :post="loadedPost" />
         </section>
    </div>
</template>


<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';

export default {
    layout: 'admin',
  components: {
    AdminPostForm
  },
  data() {
    return {
      loadedPost: {
        author: 'Tarun Sukhu',
        title: 'My post',
        content: 'Super amazing , thanks !',
        thumbnailLink: '~assets/images/main-page-background.jpg'
      }
    };
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
