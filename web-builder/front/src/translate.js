const traitInputAttr = { placeholder: 'eg. 글자를 입력해주세요' };

export default {
    assetManager: {
        addButton: '이미지 추가',
        inputPlh: 'fakepath/image.jpg',
        modalTitle: '이미지 선택',
        uploadTitle: '클릭 또는 파일을 여기로 드래그하세요',
    },
    // Here just as a reference, GrapesJS core doesn't contain any block,
    // so this should be omitted from other local files
    blockManager: {
        labels: {
            // 'block-id': 'Block Label',
        },
        categories: {
            // 'category-id': 'Category Label',
        },
    },
    domComponents: {
        names: {
            '': 'Box',
            wrapper: 'Body',
            text: 'Text',
            comment: 'Comment',
            image: 'Image',
            video: 'Video',
            label: 'Label',
            link: 'Link',
            map: 'Map',
            tfoot: 'Table foot',
            tbody: 'Table body',
            thead: 'Table head',
            table: 'Table',
            row: 'Table row',
            cell: 'Table cell',
        },
    },
    deviceManager: {
        device: '디바이스',
        devices: {
            desktop: 'PC',
            tablet: '태블릿',
            mobileLandscape: '모바일 가로 모드',
            mobilePortrait: '모바일 세로 모드',
        },
    },
    panels: {
        buttons: {
            titles: {
                preview: '미리보기',
                dragMode: "자유모드",
                deploy: "배포",
                "open-page": "페이지 열기",
                "history-load": "배포내역",
                template: "템플릿 선택",
                fullscreen: '전체화면',
                'sw-visibility': '격자보기',
                'export-template': '코드보기',
                'open-sm': '디자인 관리',
                'open-tm': '속성',
                'open-layers': '레이어 관리',
                'open-blocks': '요소 추가',
            },
        },
    },
    selectorManager: {
        label: 'Classes',
        selected: '선택됨',
        emptyState: '- 상태 -',
        states: {
            hover: 'hover',
            active: 'active',
            'nth-of-type(2n)': 'nth-of-type(2n)',
        },
    },
    styleManager: {
        empty: '원하는 요소를 먼저 선택해 주세요',
        layer: '레이어',
        fileButton: 'Images',
        sectors: {
            general: '기본설정',
            layout: '레이아웃',
            typography: '글꼴',
            decorations: '꾸미기',
            extra: '기타',
            flex: 'Flex 설정',
            dimension: '크기 및 위치',
        },
        // The core library generates the name by their `property` name
        properties: {
            // float: 'Float',
        },
    },
    traitManager: {
        empty: '원하는 요소를 먼저 선택해 주세요',
        label: '속성',
        traits: {
            // The core library generates the name by their `name` property
            labels: {
                id: 'id',
                alt: '설명',
                title: '제목',
                href: '링크 주소',
                target: "창"
            },
            // In a simple trait, like text input, these are used on input attributes
            attributes: {
                id: traitInputAttr,
                alt: traitInputAttr,
                title: traitInputAttr,
                href: { placeholder: 'eg. https://google.co.kr' },
            },
            // In a trait like select, these are used to translate option names
            options: {
                target: {
                    false: '현재 창',
                    _blank: '새 창',
                },
            },
        },
    },
};