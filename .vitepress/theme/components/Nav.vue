<template>
  <nav class="header">
    <div class="logoWrapper">Suxiong</div>
    <div class="filterContainer">filter</div>
    <a href="mailto:suxiong1998@gmail.com" class="contactWrapper">
      <p>Contact</p>
    </a>
  </nav>
</template>
<style scoped>
@media (max-width: 600px){
  .contactWrapper{
    display: none;
  }
  .logoWrapper{
    margin-bottom: 24px;
    margin-top: 36px;
  }
  .header{
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    height: 180px;
  }
}
.contactWrapper{
  letter-spacing: 0.25px;
  font-weight: 500;
}
.header {
  width: 100%;
  height: 136px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 0px 3.5vw;
}
</style>
