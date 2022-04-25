function reviewCard(id, title, truncatedReview, predictedClass) {
    let outlineColor = predictedClass == 'neg' ? 'border-danger' : 'border-success'
    let bgColor =  predictedClass == 'neg' ? 'bg-danger' : 'bg-success'
    return `
        <a href="/reviews/${id}" class="p-2 border border-1 ${outlineColor} my-2 d-block position-relative">
            <strong>${title} </strong>
            <div>${truncatedReview}</div>
            <span class="badge ${bgColor} p-1 ms-2 text-white position-absolute">
                ${predictedClass.toUpperCase()}
            </span>
        </a>`
}


async function loadReviews() {
    const reviewListEl = $('#review-list')
    await axios.get('/reviews')
            .then(function(response){
                const reviews = response.data.data
                let html = '';
                if (reviews.length > 0) {
                    reviews.forEach(review => {
                        html += reviewCard(review._id,
                                            review.title, 
                                            review.truncated, 
                                            review.predicted_class)
                    })
                } else {
                    html = 'List of reviews here ...'
                }
                reviewListEl.html(html)
            })
            .catch(function(error){
                console.error(error.message)
                reviewListEl.html('Cannot load reviews')
            })
}




$(document).ready(async function(){
    
    await loadReviews()

    $('form').on('submit', async function(event) {
        event.preventDefault();
        const formEl = event.target
        let formData = new FormData(formEl)
        formData = new URLSearchParams(formData)
        formData = Object.fromEntries(formData)
        formEl.reset()
        
        
        await axios.post('/reviews', formData)
        await loadReviews()   
    })

    $('button#clear').on('click', async function(event) {
        await axios.delete('/reviews')
        await loadReviews()
    })  
})