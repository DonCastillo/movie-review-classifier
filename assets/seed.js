
const buttons = {
    importButton: {
        api: '/seed/train',
        loading: 'Importing files ...',
        next: 'categoryButton'
    },
    categoryButton: {
        api: '/seed/category',
        loading: 'Evaluating positive and negative category data ...',
        next: 'corpusButton'
    },
    corpusButton: {
        api: '/seed/corpus',
        loading: 'Evaluating corpus ...',
        next: 'trainButton'
    },
    trainButton: {
        api: '/train',
        loading: 'Training corpus ...',
        next: 'TEST'
    },
}

async function importTrainingFiles() {
    let {api, loading, next} = buttons[event.target.id] 
    // console.log(api, loading)

    $('#spinner').removeClass('d-none')
    $('#message').text(loading)



    await axios.get(api)
            .then(function(response){
                if(response.status == 200) {
                    $('#message').text(response.data.response)

                    if(next === 'TEST') {
                        window.location.href = '/'
                    }

                    $('#seed button').addClass('d-none')
                    $(`#seed button#${next}`).removeClass('d-none')
                } else {
                    throw new Error(response.data.response)
                }
            })
            .catch(function(error){
                $('#message').text(error.message)
            })

    $('#spinner').addClass('d-none')

}


$(document).ready(async function(){
    
    

})