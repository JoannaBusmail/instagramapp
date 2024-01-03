<template>
    <Container>
        <div class="timeline-container">
            <Card
                v-for="post in data"
                :key="post.id"
                :post="post"
            ></Card>

        </div>

    </Container>
</template>

<script setup>
import Container from './Container.vue'
import Card from './Card.vue'

const data = [
    {
        id: 1,
        username: 'John Doe',
        url: 'https://picsum.photos/200/300',
        caption: ""
    },
    {
        id: 2,
        username: 'willy',
        url: 'https://picsum.photos/200/400',
        caption: "hello"
    }
]

</script>

<style scoped>
.timeline-container {
    background-color: rgb(209, 244, 233);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;



}
</style>
```