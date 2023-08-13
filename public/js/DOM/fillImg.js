export const fillImg = async (half, points, gameMode) => {
    let response;
    try {
        response = await fetch(`/assets/${gameMode}/${points}/${points}.svg`);
    } catch (error) {
        console.log('There was an error', error);
    }
    let url = "";
    if (response?.ok) {
        url = `/assets/${gameMode}/${points}/${points}.svg`
    } else {
        url = `/assets/${gameMode}/${points}.svg`
    }

    half.style.backgroundImage = `url(${url})`;
}