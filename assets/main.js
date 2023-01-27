const API = 'https://db.ygoprodeck.com/api/v7/cardinfo.php'

const content = null || document.getElementById('content')

const options =
{
    method: 'GET'
}

const fetchData = async (urlAPI) => {
    const response = await fetch(urlAPI, options)
    const data = await response.json()
    return data
}

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

(async () =>
{
    try {
        const deckFull = await fetchData(API)
        const deckPages = listToMatrix(await deckFull.data,24)
        const deck = deckPages[0]
        let view = `
        ${deck.map(card => 
            `
            <div class="group relative">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${card.card_images[0].image_url}" alt="" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${card.name}
                        ${
                            (card.level !== undefined)
                            ?
                            `
                            <br>
                                Level: ${card.level}
                            `
                            :
                            ""
                        }
                    </h3>
                    ${
                        (card.atk !== undefined)
                        ?
                        `
                        <h2 class="opacity-50 text-red-700">
                            Attack: ${card.atk}
                            <br>
                            Defence: ${card.def}
                        </h2>
                        `
                        :
                        ""
                    }
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        ${card.desc}
                    </h3>
                </div>
            </div>
            `
        ).join('\n')}
        `
        content.innerHTML = view
    } catch (error) {
        alert(`Error\n${error}`)
        console.error(error)
    }
})()