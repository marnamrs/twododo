<script>
</script>

<template>

        <div class="parent">
                <div class="content">
                        <div id="text-wrap" class="flex flex-col justify-between items-center">
                                <div id="header" class="caveat text-8xl leading-snug">Twododo</div>
                                <div class="pb-4 my-6 text-center leading-loose">
                                        <p class="italic">Keep it simple.</p>
                                        <p class="italic">Your tasks, your <span class="drawn-border">priorities.</span>
                                        </p>
                                </div>
                                <div class="caveat my-4 py-2">
                                        <router-link to="/Auth/Login" id="button">Start Tracking</router-link>
                                </div>
                        </div>
                </div>
                <div class="top flex justify-center items-end">
                        <img src="../assets/images/top-arrows.png" alt="null" class="w-[45rem]" />
                </div>
                <div class="right flex justify-start items-center">
                        <img src="../assets/images/right-arrows.png" alt="null" class="h-[25rem]" />
                </div>
                <div class="bot flex justify-center items-start">
                        <img src="../assets/images/bot-arrows.png" alt="null" class="w-[42rem]" />
                </div>
                <div class="left flex justify-end items-center">
                        <img src="../assets/images/left-arrows.png" alt="null" class="h-[25rem]" />
                </div>
        </div>

</template>

<style scoped>
#text-wrap {
        padding: 2rem;
}

.drawn-border {
        box-sizing: border-box;
        border-bottom: solid 3px rgb(94, 94, 94);
        border-bottom-right-radius: 225px 15px;
        border-bottom-left-radius: 15px 255px;
        margin-bottom: 1rem;
}

.parent {
        z-index: 0;
        display: grid;
        grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
        grid-template-rows: 1fr 2fr 2fr 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        height: 80vh;
        width: 80vw;
        margin: 3rem auto;
        min-height: 600px;

}

.content {
        z-index: 1;
        grid-area: 2 / 2 / 4 / 5;
        box-sizing: border-box;
        border-color: rgb(75, 75, 75);
        border-width: 2px;
        border-radius: 15px;
        background-color: white;
        box-shadow: 5px 10px 10px rgba(78, 78, 78, 0.863);
        min-height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
}

.top {
        grid-area: 1 / 1 / 2 / 6;
}

.right {
        grid-area: 2 / 5 / 4 / 6;
}

.bot {
        grid-area: 4 / 1 / 5 / 6;
}

.left {
        grid-area: 2 / 1 / 4 / 2;
}


#button {
        white-space: nowrap;
        padding: .5rem 3rem;
        background-color: rgb(226, 226, 226);
        box-shadow: 2px 5px 5px rgba(145, 145, 145, 0.863);
        border-radius: 15px;
        font-size: 1.5rem;
}

#button:hover {
        background-color: rgb(187, 187, 187);
        box-shadow: 1px 2px 2px rgba(112, 112, 112, 0.863);

}

@media(max-width: 600px) {
        .parent {
                width: 100vw;
                margin: 0;
        }

        #header {
                font-size: 58px;
        }

        .top img,
        .bot img {
                display: none;
        }
}
</style>