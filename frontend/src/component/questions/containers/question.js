import React from "react";
import { QuestionRow } from "../components/rows/questionRow";
import { EditRow } from "../components/rows/editRow";
import { NewRow } from "../components/rows/newRow";

export class Question extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false,
			_id: "",
			question: "",
			options: "",
			correct: ""
		};
		var question = this.props.question;

		if (this.props.editMode) this.state.editMode = true;
		if (this.props.newMode) this.state.newMode = true;
		// this.state.question = this.props.question;
		this.state.question = question;
		this.handleRowEdit = this.handleRowEdit.bind(this);
		this.handleRowSave = this.handleRowSave.bind(this);
		this.handleRowCreate = this.handleRowCreate.bind(this);
		this.newRowCellChange = this.newRowCellChange.bind(this);
		this.editOnCellChange = this.editOnCellChange.bind(this);
	}

	handleRowCreate() {
		let question = {
			_id: this.state._id,
			question: this.state.question,
			options: this.state.options,
			correct: this.state.correct
		};
		this.props.onRowAdd(question);
		this.setState({
			_id: "",
			question: "",
			options: "",
			correct: ""
		});
	}

	handleDeleteClick = () => {
		this.props.onDelEvent(this.props.question);
	};

	newRowCellChange(evt) {
		var item = {
			name: evt.target.name,
			value: evt.target.value
		};
		this.setState({ [item.name]: item.value });
	}

	editOnCellChange(evt) {
		let question = this.state.question;
		question[evt.target.name] = evt.target.value;
		this.setState({
			question: question
		});
	}

	handleRowEdit() {
		this.setState({ editMode: true });
	}

	handleRowSave() {
		this.setState({ editMode: false });
		// Different than state.name etc to be able to reset it if needed
		this.props.onRowSave(this.state.question);
	}

	// Lifecycle methods
	componentWillReceiveProps(nextProps){
        if(nextProps.question !== this.props.question){
            this.setState({question:nextProps.question});
        }
    }

	render() {
		let question = this.props.question;
		let editMode = this.state.editMode;
		let newMode = this.state.newMode;
		let rowDel = this.handleDeleteClick;
		let newRowCellChange = this.newRowCellChange;
		let editOnCellChange = this.editOnCellChange;

		let rendering;

		if (newMode) {
			rendering = (
				<NewRow
					onSaveEvent={this.handleRowCreate}
					onCellChange={newRowCellChange}
					_id={this.state._id}
					question={this.state.question}
					options={this.state.options}
					correct={this.state.correct}
				/>
			);
		} else {
			if (editMode) {
				rendering = (
					<EditRow
						question={question}
						onDelEvent={rowDel}
						onSaveEvent={this.handleRowSave}
						onCellChange={editOnCellChange}
					/>
				);
			} else {
				rendering = (
					<QuestionRow
						question={question}
						onDelEvent={rowDel}
						onEditEvent={this.handleRowEdit}
					/>
				);
			}
		}
		return rendering;
	}
}
