<template>
  <div v-if="product" class="card text-primary">
    <router-link v-if="product.pictures && product.pictures.length" :to="'/loja/'+product._id" class="card-img">
      <b-img :src="product.pictures[0].thumb" width="100" alt="placeholder" class="card-img-top" />
    </router-link>
    <div class="card-body">
      <router-link :to="'/loja/'+product._id">
        <strong class="card-title text-primary">{{ product.name }}</strong>
      </router-link>
    </div>
    <div class="card-footer">
      <AddToCart :product="product" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => null
    }
  }
}
</script>
