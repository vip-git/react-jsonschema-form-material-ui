export default {
	fieldSet: (theme) => ({
		root: {
			display: 'flex',
			flexDirection: 'column',
			border: 'none',
			padding: 0,
			margin: 0,
		},
		listItem: {
			border: `1px dotted ${theme.palette.primary.main}`,
			margin: theme.spacing(1),
			padding: theme.spacing(1),
		},
	}),
	fieldSetObject: {
		root: {
			display: 'flex',
			flexDirection: 'column',
			'&$row': {
				flexDirection: 'row',
			},
		},
		row: {},
		listItem: {},
	},
	fieldSetArray: (theme) => ({
		root: {
			display: 'flex',
			flexDirection: 'column',
		},
		listItem: {},
		addItemBtn: {
			display: 'flex',
			justifyContent: 'flex-end',
			'&>button': {
				background: theme.palette.primary.main,
				width: '3.75em',
				color: theme.palette.common.white,
				height: '1.25em',
				borderRadius: 5,
				'&> span': {
					position: 'absolute',
					fontSize: 'small',
					textIndent: 12,
				},
			},
		},
	}),
	reorderable: {
		root: {
			display: 'flex',
			alignItems: 'baseline',
			justifyContent: 'space-between',
			'& >fieldset': {
				width: '100%',
			},
		},
		listItem: {},
	},
	reorderControls: (theme) => ({
		root: {
			display: 'flex',
			border: `1px solid ${theme.palette.grey[400]}`,
			alignItems: 'center',
			borderRadius: 5,
			alignSelf: 'flex-start',
			marginTop: 7,
			borderRadius: 5,
			'& >button': {
				borderRadius: 0,
				width: '1.25em',
				height: '1.25em',
				'&:not(:last-child)': {
					borderRight: `1px solid ${theme.palette.grey[400]}`,
				},
			},
		},
		remove: {
			background: theme.palette.error.main,
			color: theme.palette.common.white,
			'& >span': {
				position: 'absolute',
			},
		},
		removeCanReorder: {
			marginRight: 10,
		},
	}),
	fieldSetContent: {
		root: {
			marginTop: 20,
		},
		listItem: {},
	},
};
