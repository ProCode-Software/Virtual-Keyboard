const enabled = document.body.getAttribute('keyboard-enabled')


if (enabled == 'true') {
    let keyboardOpen = false
    const allInputs = document.querySelectorAll('input, textarea')


    let currentInput;
    const keyboard = document.createElement('div')
    keyboard.className = 'keyboard'
    keyboard.classList.add('docked')
    document.body.append(keyboard)
    keyboard.style.display = 'none'
    let numberKeyText = '&123'

    const sidebars = [
        [
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" item-class="emojiBtn">
<circle cx="12" cy="12" r="9.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="9" cy="9" r="1.25" fill="currentColor"/>
<circle cx="15" cy="9" r="1.25" fill="currentColor"/>
<path d="M16.2 12.75C16.4736 12.75 16.6103 12.75 16.7256 12.8159C16.8173 12.8683 16.9085 12.9754 16.9456 13.0742C16.9923 13.1985 16.9736 13.3146 16.9361 13.5466C16.8744 13.929 16.7683 14.3039 16.6194 14.6634C16.3681 15.27 15.9998 15.8212 15.5355 16.2855C15.0712 16.7498 14.52 17.1181 13.9134 17.3694C13.3068 17.6207 12.6566 17.75 12 17.75C11.3434 17.75 10.6932 17.6207 10.0866 17.3694C9.47995 17.1181 8.92876 16.7498 8.46447 16.2855C8.00017 15.8212 7.63188 15.27 7.3806 14.6634C7.23167 14.3039 7.12558 13.929 7.06386 13.5466C7.02642 13.3146 7.0077 13.1985 7.05439 13.0742C7.09151 12.9754 7.18269 12.8683 7.27436 12.8159C7.38966 12.75 7.52644 12.75 7.8 12.75L16.2 12.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" item-class="dictateBtn">
<path d="M8.80109 6.44894C8.80109 4.68221 10.2333 3.25 12 3.25C13.7667 3.25 15.199 4.68221 15.199 6.44894V11.3982C15.199 13.165 13.7667 14.5972 12 14.5972C10.2333 14.5972 8.80109 13.165 8.80109 11.3982V6.44894Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.97111 11.4023C5.97111 10.9881 5.63532 10.6523 5.22111 10.6523C4.8069 10.6523 4.47111 10.9881 4.47111 11.4023H5.97111ZM19.5289 11.4023C19.5289 10.9881 19.1931 10.6523 18.7789 10.6523C18.3647 10.6523 18.0289 10.9881 18.0289 11.4023H19.5289ZM11.25 20.75C11.25 21.1642 11.5858 21.5 12 21.5C12.4142 21.5 12.75 21.1642 12.75 20.75L11.25 20.75ZM12 17.4312C8.67034 17.4312 5.97111 14.732 5.97111 11.4023H4.47111C4.47111 15.5604 7.84191 18.9312 12 18.9312V17.4312ZM18.0289 11.4023C18.0289 14.732 15.3297 17.4312 12 17.4312V18.9312C16.1581 18.9312 19.5289 15.5604 19.5289 11.4023H18.0289ZM11.25 18.1812L11.25 20.75L12.75 20.75L12.75 18.1812L11.25 18.1812Z" fill="currentColor"/>
</svg>
`],
        [`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" item-class="cutBtn">
<path d="M8.65129 14.4293C6.95477 13.2414 4.61648 13.6537 3.42856 15.3502C2.24065 17.0467 2.65295 19.385 4.34947 20.5729C6.04599 21.7608 8.38429 21.3485 9.5722 19.652C10.7601 17.9555 10.3478 15.6172 8.65129 14.4293ZM8.65129 14.4293L12.0001 9.98366M17.4501 2.74858L13.6316 7.81772M15.3488 14.4293C17.0453 13.2414 19.3836 13.6537 20.5716 15.3502C21.7595 17.0467 21.3472 19.385 19.6507 20.5729C17.9541 21.7608 15.6158 21.3485 14.4279 19.652C13.24 17.9555 13.6523 15.6172 15.3488 14.4293ZM15.3488 14.4293L12.0001 9.98366M6.55006 2.74858L12.0001 9.98366" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`, `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" item-class="copyBtn">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2186 2H16.2814C16.9548 1.99999 17.5055 1.99998 17.9531 2.03655C18.4163 2.0744 18.8347 2.15514 19.2255 2.35423C19.837 2.66582 20.3342 3.163 20.6458 3.77453C20.8449 4.16527 20.9256 4.58367 20.9634 5.04693C21 5.49449 21 6.04519 21 6.71856V14.7814C21 15.4548 21 16.0055 20.9634 16.4531C20.9256 16.9163 20.8449 17.3347 20.6458 17.7255C20.3342 18.337 19.837 18.8342 19.2255 19.1458C18.8347 19.3449 18.4163 19.4256 17.9531 19.4634C17.5055 19.5 16.9548 19.5 16.2814 19.5H11.2186C10.5452 19.5 9.99449 19.5 9.54693 19.4634C9.08367 19.4256 8.66527 19.3449 8.27453 19.1458C7.663 18.8342 7.16582 18.337 6.85423 17.7255C6.65514 17.3347 6.5744 16.9163 6.53655 16.4531C6.49998 16.0055 6.49999 15.4548 6.5 14.7814V6.71858C6.49999 6.0452 6.49998 5.4945 6.53655 5.04693C6.5744 4.58367 6.65514 4.16527 6.85423 3.77453C7.16582 3.163 7.663 2.66582 8.27453 2.35423C8.66527 2.15514 9.08367 2.0744 9.54693 2.03655C9.9945 1.99998 10.5452 1.99999 11.2186 2ZM9.66908 3.53157C9.29858 3.56184 9.09956 3.61735 8.95552 3.69074C8.62623 3.85852 8.35852 4.12623 8.19074 4.45552C8.11735 4.59956 8.06184 4.79858 8.03157 5.16908C8.00058 5.54833 8 6.03756 8 6.75V14.75C8 15.4624 8.00058 15.9517 8.03157 16.3309C8.06184 16.7014 8.11735 16.9004 8.19074 17.0445C8.35852 17.3738 8.62623 17.6415 8.95552 17.8093C9.09956 17.8827 9.29858 17.9382 9.66908 17.9684C10.0483 17.9994 10.5376 18 11.25 18H16.25C16.9624 18 17.4517 17.9994 17.8309 17.9684C18.2014 17.9382 18.4004 17.8827 18.5445 17.8093C18.8738 17.6415 19.1415 17.3738 19.3093 17.0445C19.3827 16.9004 19.4382 16.7014 19.4684 16.3309C19.4994 15.9517 19.5 15.4624 19.5 14.75V6.75C19.5 6.03756 19.4994 5.54833 19.4684 5.16908C19.4382 4.79858 19.3827 4.59956 19.3093 4.45552C19.1415 4.12623 18.8738 3.85852 18.5445 3.69074C18.4004 3.61735 18.2014 3.56184 17.8309 3.53157C17.4517 3.50058 16.9624 3.5 16.25 3.5H11.25C10.5376 3.5 10.0483 3.50058 9.66908 3.53157Z" fill="currentColor"/>
<path d="M15.4531 21.9634C15.9163 21.9256 16.3347 21.8449 16.7255 21.6458C17.2538 21.3766 17.6968 20.9688 18.0085 20.4684H15.3309C14.9517 20.4994 14.4624 20.5 13.75 20.5H12.75C11.3375 20.5 10.3232 20.4994 9.52708 20.4344C8.7397 20.37 8.23197 20.2464 7.82054 20.0368C7.02085 19.6293 6.37068 18.9791 5.96322 18.1795C5.75359 17.768 5.62996 17.2603 5.56563 16.4729C5.50058 15.6768 5.5 14.6625 5.5 13.25V9.25C5.5 8.53756 5.50058 8.04833 5.53157 7.66908V4.99146C5.03121 5.30315 4.62345 5.74616 4.35423 6.27453C4.15514 6.66527 4.0744 7.08367 4.03655 7.54693C3.99998 7.99449 3.99999 8.5452 4 9.21858L4 13.2836C4 14.6553 3.99999 15.7307 4.07061 16.5951C4.14252 17.4752 4.29138 18.2023 4.62671 18.8604C5.17798 19.9424 6.05762 20.822 7.13955 21.3733C7.79769 21.7086 8.5248 21.8575 9.40494 21.9294C10.2693 22 11.3447 22 12.7164 22H13.7814C14.4548 22 15.0055 22 15.4531 21.9634Z" fill="currentColor"/>
</svg>
`, `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" item-class="pasteBtn">
<path d="M9.24879 21.25H8.13302C6.24921 21.25 5.3073 21.25 4.58778 20.8834C3.95487 20.5609 3.4403 20.0463 3.11782 19.4134C2.75121 18.6939 2.75121 17.752 2.75121 15.8682V8.13182C2.75121 6.24801 2.75121 5.3061 3.11782 4.58658C3.4403 3.95367 3.95487 3.4391 4.58778 3.11661C5.3073 2.75 6.24921 2.75 8.13302 2.75H13.627C15.5108 2.75 16.4527 2.75 17.1722 3.11661C17.8051 3.4391 18.3197 3.95367 18.6422 4.58658C18.8833 5.05989 18.9659 5.62942 18.9941 6.5C18.9992 6.65654 19.0025 6.57281 19.0047 6.75L19 7.75M14.7797 2.75H6.98025C6.97168 2.75 6.96739 2.75 6.96411 2.7518C6.96123 2.75339 6.95889 2.75591 6.95742 2.75902C6.95575 2.76256 6.95575 2.76718 6.95575 2.77644V3.98333C6.95575 4.92524 6.95575 5.39619 7.13906 5.75595C7.3003 6.07241 7.55759 6.32969 7.87404 6.49094C8.17916 6.6464 8.56425 6.67001 9.24879 6.6736C9.37139 6.67424 9.50359 6.67424 9.64666 6.67424H12.1133C13.0552 6.67424 13.5262 6.67424 13.8859 6.49094C14.2024 6.32969 14.4597 6.07241 14.6209 5.75595C14.8042 5.39619 14.8042 4.92524 14.8042 3.98333V2.77644C14.8042 2.76718 14.8042 2.76256 14.8026 2.75902C14.8011 2.75591 14.7988 2.75339 14.7959 2.7518C14.7926 2.75 14.7883 2.75 14.7797 2.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.7488 14.25C11.7488 12.8499 11.7488 12.1498 12.0213 11.615C12.261 11.1446 12.6434 10.7622 13.1138 10.5225C13.6486 10.25 14.3487 10.25 15.7488 10.25H17.2488C18.6489 10.25 19.349 10.25 19.8838 10.5225C20.3542 10.7622 20.7366 11.1446 20.9763 11.615C21.2488 12.1498 21.2488 12.8499 21.2488 14.25V17.25C21.2488 18.6501 21.2488 19.3502 20.9763 19.885C20.7366 20.3554 20.3542 20.7378 19.8838 20.9775C19.349 21.25 18.6489 21.25 17.2488 21.25H15.7488C14.3487 21.25 13.6486 21.25 13.1138 20.9775C12.6434 20.7378 12.261 20.3554 12.0213 19.885C11.7488 19.3502 11.7488 18.6501 11.7488 17.25V14.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`]
    ]

    keyboard.innerHTML = `
        <div class="sidebar"></div>
        <div class="keysFrame"></div>
        <div class="pageFrame"></div>
    `

    const textPreview = document.createElement('div')
    textPreview.className = 'textPreview'

    textPreview.innerHTML = `
    <div class="textPreviewInput" readonly="true"></div>
    `

    keyboard.insertBefore(textPreview, keyboard.querySelector('.sidebar'))

    let keyboardCapsLevel = 1
    const keyboardLayouts = {
        "default": [
            [
                "1 2 3 4 5 6 7 8 9 0",
                "q w e r t y u i o p",
                "a s d f g h j k l",
                "$shift z x c v b n m $backspace",
                "$numbers , $space . $enter"
            ],
            [
                "1 2 3 4 5 6 7 8 9 0",
                "! @ # $ % & * ( )",
                "+ - = : \" ' ?",
                "$symbols [ ] \\ ; , . / $backspace",
                "$letters , $space . $enter"
            ],
            [
                "1 2 3 4 5 6 7 8 9 0",
                "` ~ × ÷ € £ • ° ✕ ¿",
                "{ } | < > ^ _ © ¡",
                "$numbers ✓ ← → ■ ● □ ○ $backspace",
                "$letters , $space . $enter"
            ]
        ]
    }


    const pages = [
        `<div class="dictatePage page">
            <button class="dictatorBtn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="dictateIcon">
                    <path d="M8.80127 6.44894C8.80127 4.68221 10.2335 3.25 12.0002 3.25C13.7669 3.25 15.1991 4.68221 15.1991 6.44894V11.3982C15.1991 13.165 13.7669 14.5972 12.0002 14.5972C10.2335 14.5972 8.80127 13.165 8.80127 11.3982V6.44894Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="dicic1"/>
                    <path d="M5.97119 11.4023C5.97119 10.9881 5.6354 10.6523 5.22119 10.6523C4.80698 10.6523 4.47119 10.9881 4.47119 11.4023H5.97119ZM19.529 11.4023C19.529 10.9881 19.1932 10.6523 18.779 10.6523C18.3648 10.6523 18.029 10.9881 18.029 11.4023H19.529ZM11.2501 20.75C11.2501 21.1642 11.5859 21.5 12.0001 21.5C12.4143 21.5 12.7501 21.1642 12.7501 20.75L11.2501 20.75ZM12.0001 17.4312C8.67042 17.4312 5.97119 14.732 5.97119 11.4023H4.47119C4.47119 15.5604 7.84199 18.9312 12.0001 18.9312V17.4312ZM18.029 11.4023C18.029 14.732 15.3297 17.4312 12.0001 17.4312V18.9312C16.1582 18.9312 19.529 15.5604 19.529 11.4023H18.029ZM11.2501 18.1812L11.2501 20.75L12.7501 20.75L12.7501 18.1812L11.2501 18.1812Z" fill="currentColor" id="dicic2"/>
                </svg>
            </button>
                <div class="dictationHint">Error: This page was not loaded correctly.</div>
            </div>
        </div>`
    ]

    let keyboardLayout = keyboardLayouts.default
    let currentPage = 0

    function writeKeys(pageNum) {
        keyboard.setAttribute('caps-level', keyboardCapsLevel)
        currentPage = pageNum
        let keyboardPage = keyboardLayout[pageNum]
        let keysFrame = keyboard.querySelector('.keysFrame')

        let rowNum = 0
        const allModifiers = ['$shift', '$backspace', '$numbers', '$letters', '$space', '$enter', '$symbols']

        keysFrame.innerHTML = ''

        let spacebarText = ''

        keyboardPage.forEach(row => {
            const rowEl = document.createElement('div')
            rowEl.className = 'keyboardRow'
            rowEl.setAttribute('row-number', rowNum)

            row.split(' ').forEach(key => {
                const keyEl = document.createElement('button')
                keyEl.className = 'key'
                keyEl.setAttribute('key', key)
                keyEl.append(document.createTextNode(keyboardCapsLevel > 1 ? key.toUpperCase() : key.toLowerCase()))

                if (allModifiers.indexOf(key) > -1) {
                    if (key !== '$space') {
                        keyEl.classList.add('modifier', `${key.replace('$', '')}Key`)
                    } else {
                        keyEl.classList.add('spaceBar')
                        keyEl.innerHTML = ''
                    }


                    let text;
                    switch (key) {
                        case '$numbers':
                            text = numberKeyText
                            break;
                        case '$space':
                            text = spacebarText
                            break;
                        case '$shift':
                            text = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.50322 11.9125L10.1044 3.66107C11.0762 2.44631 12.9238 2.44631 13.8956 3.66106L20.4967 11.9125C21.326 12.9491 20.588 14.4847 19.2605 14.4847H15.1663V18.2103C15.1663 19.2743 15.1663 19.8063 14.9592 20.2127C14.7771 20.5702 14.4864 20.8608 14.129 21.0429C13.7226 21.25 13.1906 21.25 12.1266 21.25H11.8733C10.8093 21.25 10.2773 21.25 9.87089 21.0429C9.51342 20.8608 9.22278 20.5702 9.04064 20.2127C8.83358 19.8063 8.83358 19.2743 8.83358 18.2103V14.4847H4.73947C3.41197 14.4847 2.67393 12.9491 3.50322 11.9125Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="shiftIcon"/>
</svg>
`
                            break;
                        case '$backspace':
                            text = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66124 6.54426C7.18643 5.97531 7.44902 5.69084 7.76175 5.48694C8.03894 5.30622 8.34412 5.1726 8.66493 5.0915C9.02688 5 9.41402 5 10.1883 5H15.62C17.3002 5 18.1403 5 18.782 5.32698C19.3465 5.6146 19.8054 6.07354 20.0931 6.63803C20.42 7.27976 20.42 8.11984 20.42 9.8V13.5611C20.42 15.2413 20.42 16.0813 20.0931 16.7231C19.8054 17.2876 19.3465 17.7465 18.782 18.0341C18.1403 18.3611 17.3002 18.3611 15.62 18.3611H10.1883C9.41402 18.3611 9.02688 18.3611 8.66493 18.2696C8.34412 18.1885 8.03894 18.0549 7.76175 17.8742C7.44902 17.6703 7.18643 17.3858 6.66124 16.8169L4.92535 14.9363C3.8655 13.7881 3.33557 13.214 3.13514 12.5619C2.95864 11.9876 2.95864 11.3735 3.13514 10.7992C3.33557 10.1471 3.8655 9.57298 4.92535 8.42481L6.66124 6.54426Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="b1"/>
<path d="M11 9.18054L16 14.1805M16 9.18054L11 14.1805" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="x2"/>
</svg>
`
                            break;
                        case '$enter':
                            text = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.25 5.62334V7.12002C20.25 9.36023 20.25 10.4803 19.814 11.336C19.4305 12.0886 18.8186 12.7006 18.066 13.084C17.2103 13.52 16.0902 13.52 13.85 13.52H4.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.60664 18.3766L5.44706 15.2171C4.85303 14.623 4.55602 14.326 4.44474 13.9835C4.34685 13.6823 4.34685 13.3577 4.44474 13.0565C4.55602 12.714 4.85303 12.417 5.44706 11.8229L8.60664 8.66336" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
                            break;
                        case '$letters':
                            text = 'ABC'
                            break;
                        case '$symbols':
                            text = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.9005 3.91793C14.6639 3.15447 15.9017 3.15447 16.6652 3.91793L17.2889 4.54168L17.9127 3.91793C18.6761 3.15447 19.9139 3.15447 20.6774 3.91793C21.4409 4.68138 21.4409 5.91919 20.6774 6.68264L20.0536 7.30639L20.0593 7.31201L17.2946 10.0767L17.2889 10.0711L17.2833 10.0767L14.5186 7.31201L14.5242 7.30639L13.9005 6.68264C13.137 5.91919 13.137 4.68138 13.9005 3.91793Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M3.73579 9.09094C4.34486 9.70001 5.18628 10.0767 6.11569 10.0767C7.97452 10.0767 9.48139 8.56985 9.48139 6.71103C9.48139 5.78162 9.10467 4.9402 8.4956 4.33113M3.73579 9.09094C3.12672 8.48186 2.75 7.64044 2.75 6.71103C2.75 4.85221 4.25687 3.34534 6.11569 3.34534C7.0451 3.34534 7.88653 3.72206 8.4956 4.33113M3.73579 9.09094L8.4956 4.33113" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.75 17.289H6.11568M6.11568 17.289L9.48139 17.289M6.11568 17.289V13.9233M6.11568 17.289L6.11571 20.6547" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.6083 15.6061L18.9588 15.9811C19.0172 16.0822 19.0983 16.1683 19.1958 16.2325L19.6083 15.6061ZM18.1822 14.2704L18.5139 13.5977L18.1822 14.2704ZM14.4744 14.7585L14.9689 15.3224H14.9689L14.4744 14.7585ZM12.7181 16.2238C12.6109 16.6239 12.8484 17.0351 13.2484 17.1423C13.6485 17.2495 14.0598 17.0121 14.167 16.612L12.7181 16.2238ZM20.8093 13.9233C20.8093 13.5091 20.4735 13.1733 20.0593 13.1733C19.645 13.1733 19.3093 13.5091 19.3093 13.9233H20.8093ZM18.0794 15.1531C17.6652 15.1531 17.3294 15.4889 17.3294 15.9031C17.3294 16.3173 17.6652 16.6531 18.0794 16.6531V15.1531ZM12.5779 20.6547C12.5779 21.0689 12.9137 21.4047 13.3279 21.4047C13.7421 21.4047 14.0779 21.0689 14.0779 20.6547H12.5779ZM15.3077 19.4248C15.7219 19.4248 16.0577 19.0891 16.0577 18.6748C16.0577 18.2606 15.7219 17.9248 15.3077 17.9248V19.4248ZM13.7788 18.9718L14.4283 18.5968C14.37 18.4957 14.2888 18.4097 14.1913 18.3455L13.7788 18.9718ZM15.205 20.3076L14.8732 20.9802H14.8732L15.205 20.3076ZM20.669 18.3542C20.7762 17.9541 20.5388 17.5428 20.1387 17.4356C19.7386 17.3284 19.3273 17.5659 19.2201 17.966L20.669 18.3542ZM20.0593 15.9031V16.6531C20.4735 16.6531 20.8093 16.3173 20.8093 15.9031H20.0593ZM13.3279 18.6748V17.9248C12.9137 17.9248 12.5779 18.2606 12.5779 18.6748H13.3279ZM20.2579 15.2311C19.8509 14.5262 19.244 13.9577 18.5139 13.5977L17.8505 14.943C18.3144 15.1718 18.7002 15.5331 18.9588 15.9811L20.2579 15.2311ZM18.5139 13.5977C17.7838 13.2377 16.9634 13.1022 16.1564 13.2085L16.3522 14.6957C16.8651 14.6281 17.3865 14.7142 17.8505 14.943L18.5139 13.5977ZM16.1564 13.2085C15.3493 13.3147 14.5919 13.6579 13.9799 14.1946L14.9689 15.3224C15.3579 14.9813 15.8392 14.7632 16.3522 14.6957L16.1564 13.2085ZM13.9799 14.1946C13.3679 14.7313 12.9288 15.4375 12.7181 16.2238L14.167 16.612C14.3009 16.1123 14.58 15.6635 14.9689 15.3224L13.9799 14.1946ZM13.1293 19.3468C13.5363 20.0518 14.1432 20.6202 14.8732 20.9802L15.5367 19.6349C15.0727 19.4061 14.687 19.0448 14.4283 18.5968L13.1293 19.3468ZM14.8732 20.9802C15.6033 21.3403 16.4237 21.4757 17.2308 21.3695L17.035 19.8823C16.5221 19.9498 16.0007 19.8637 15.5367 19.6349L14.8732 20.9802ZM17.2308 21.3695C18.0378 21.2632 18.7952 20.92 19.4072 20.3833L18.4182 19.2556C18.0293 19.5967 17.5479 19.8148 17.035 19.8823L17.2308 21.3695ZM19.4072 20.3833C20.0192 19.8466 20.4583 19.1405 20.669 18.3542L19.2201 17.966C19.0862 18.4657 18.8072 18.9144 18.4182 19.2556L19.4072 20.3833ZM14.1913 18.3455L13.7404 18.0485L12.9154 19.3012L13.3663 19.5982L14.1913 18.3455ZM19.1958 16.2325L19.6467 16.5295L20.4718 15.2767L20.0209 14.9798L19.1958 16.2325ZM19.3093 13.9233V15.9031H20.8093V13.9233H19.3093ZM20.0593 15.1531H18.0794V16.6531H20.0593V15.1531ZM14.0779 20.6547V18.6748H12.5779V20.6547H14.0779ZM13.3279 19.4248H15.3077V17.9248H13.3279V19.4248Z" fill="currentColor"/>
</svg>
`
                            break;
                        default:
                            text = key
                            break;
                    }
                    keyEl.innerHTML = text


                    switch (key) {
                        case '$shift':
                            keyEl.addEventListener('click', () => caps())
                            break;
                        case '$letters':
                            keyEl.addEventListener('click', () => writeKeys(0))
                            break;
                        case '$numbers':
                            keyEl.addEventListener('click', () => writeKeys(1))
                            break;
                        case '$symbols':
                            keyEl.addEventListener('click', () => writeKeys(2))
                            break;
                    }
                }

                keyEl.addEventListener('click', () => {
                    if (!keyEl.classList.contains('modifier')) {
                        if (key !== '$space') {
                            typeKey(keyboardCapsLevel < 2 ? key.toLowerCase() : key.toUpperCase())
                        } else {
                            typeKey(' ')
                        }
                        if (keyboardCapsLevel == 2) {
                            keyboardCapsLevel = 1
                            writeKeys(pageNum)
                        }
                    } else {
                        if (key == '$backspace') {
                            backspace()
                        }
                        if (key == '$enter') {
                            if (currentInput.tagName == 'INPUT') {
                                closeKeyboard()
                            } else {
                                typeKey('\n')
                            }
                        }
                    }
                })

                rowEl.append(keyEl)
            })
            keysFrame.append(rowEl)
            rowNum++
        })

    }
    writeKeys(currentPage)

    function caps() {
        keyboardCapsLevel++
        if (keyboardCapsLevel > 3) {
            keyboardCapsLevel = 1
        }
        keyboard.setAttribute('caps-level', keyboardCapsLevel)
        writeKeys(0)
    }

    function typeKey(key) {
        if (currentInput) {
            currentInput.value += key
            keyboard.querySelector('.textPreviewInput').innerHTML = currentInput.value
        }
    }
    function backspace() {
        if (currentInput) {
            currentInput.value = currentInput.value.substring(0, currentInput.value.length - 1)
            keyboard.querySelector('.textPreviewInput').innerHTML = currentInput.value
        }
    }



    function createSidebar(sidebarNum) {
        let sidebarView = sidebars[sidebarNum]
        let sidebarFrame = keyboard.querySelector('.sidebar')

        sidebarView.innerHTML = ''

        const sidebarItemCt = document.createElement('div')
        sidebarItemCt.className = 'sidebarTop'
        sidebarItemCt.classList.add('sidebarItemFrame')

        sidebarView.forEach(item => {
            const itemEl = document.createElement('button')
            itemEl.className = 'sidebarItem'
            itemEl.innerHTML = item
            itemEl.classList.add(itemEl.querySelector('svg').getAttribute('item-class'))
            sidebarItemCt.append(itemEl)

        })

        sidebarFrame.append(sidebarItemCt)
        sidebarFrame.innerHTML += `
            <div class="sidebarItemFrame sidebarBottom">
                <button class="sidebarItem moreBtn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="6" cy="12" r="1.75" fill="currentColor"/>
<circle cx="12" cy="12" r="1.75" fill="currentColor"/>
<circle cx="18" cy="12" r="1.75" fill="currentColor"/>
</svg>
                </button>
            </div>
        `

        sidebarFrame.querySelectorAll('button.sidebarItem').forEach(element => {
            element.addEventListener('click', (e) => {
                switch (element.querySelector('svg').getAttribute('item-class')) {
                    case 'moreBtn':
                        openPage('options')
                        break;
                    case 'emojiBtn':
                        break;
                    case 'dictateBtn':
                        openPage(0)
                        break;
                }
            })
        })
    }
    createSidebar(0)

    function openPage(pageNumber) {
        const pageFrame = keyboard.querySelector('.pageFrame')
        keyboard.classList.add('pageFrameVisible')

        const pageToOpen = pages[pageNumber]

        pageFrame.innerHTML = `
        <div class="pageToolbar">
        <div class="pageToolbarLeft">
        <button class="pageBackButton pageToolbarButton" title="Back"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.75 4.75L8.56066 10.9393C7.97487 11.5251 7.97487 12.4749 8.56066 13.0607L14.75 19.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
<div class="pageTitle" style="display:none">Settings</div>
        </div>
        <div class="pageToolbarRight"></div>
        </div>
        
        ${pageToOpen}
        `

        pageFrame.setAttribute('active-page', pageNumber)


        if (pageNumber == 0) {
            const dictatorBtn = pageFrame.querySelector('dictatorBtn')
            dictatorBtn.addEventListener('click', () => {
                dictate(pageFrame)
            })
            dictatorBtn.click()
        }
    }



    function dictate(pf) {
        const sr = new SpeechRecognition()

        sr.continuous = true
        sr.interimResults = true
        sr.maxAlternatives = Infinity

       
    }


    function openKeyboard(input) {
        keyboard.style.display = 'flex'
        keyboard.setAttribute('currentInput', input.getAttribute('data-input-num'))
        currentInput = input
    }
    function closeKeyboard() {
        keyboard.style.display = 'none' //none
        keyboard.setAttribute('currentInput', 'none')
    }


    let inputNumber = 0
    allInputs.forEach(input => {
        input.setAttribute('data-input-num', inputNumber)
        input.addEventListener('focus', () => {
            keyboardOpen = true
            openKeyboard(input)
            currentInput = input
        })
        /* input.addEventListener('blur', () => {
            keyboardOpen = false
            closeKeyboard()
        }) */
        inputNumber++
    })
    window.addEventListener('click', (e) => {
        if (keyboardOpen) {
            if (document.elementsFromPoint(e.x, e.y).indexOf(currentInput) > -1 || document.elementsFromPoint(e.x, e.y).indexOf(keyboard) > -1) {

            } else {
                closeKeyboard()
            }
        }
    })
}
async function fetch(file) {
    let obj = await fetch(file);
    let txt = await obj.text();
    return txt
}