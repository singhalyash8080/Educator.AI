import React from "react";

export class EditRow extends React.Component {
	render() {
		var question = this.props.question;
		var onSaveEvent = this.props.onSaveEvent;
		let onDelEvent = this.props.onDelEvent;
		let onCellChange = this.props.onCellChange;

		return (
			<tr>
				<td>
					<input
						type="text"
						_ids={question._ids}
						name="_id"
						defaultValue={question._id}
						onChange={onCellChange}
						className="input"
					/>
				</td>
				<td>
					<input
						type="text"
						_ids={question._ids}
						name="question"
						defaultValue={question.question}
						onChange={onCellChange}
						className="input"
					/>
				</td>
				<td>
					<input
						type="text"
						_ids={question._ids}
						name="options"
						defaultValue={question.options}
						onChange={onCellChange}
						className="input"
					/>
				</td>
				<td>
					<input
						type="text"
						_ids={question._ids}
						name="correct"
						defaultValue={question.correct}
						onChange={onCellChange}
						className="input"
					/>
				</td>
				<td>
					<i className="material-icons" onClick={onSaveEvent} style={{ cursor: 'pointer' }}>done</i>
					<i className="material-icons" onClick={onDelEvent} style={{ cursor: 'pointer' }}>delete</i>
				</td>
			</tr>
		);
	}
}
