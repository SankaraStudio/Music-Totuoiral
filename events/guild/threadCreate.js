module.exports = async function(client, thread) {
  try {
    await thread.join();
  } catch (e) {
    console.log(e);
  }
};
