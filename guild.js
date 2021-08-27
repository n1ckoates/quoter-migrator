/*
Copyright (C) 2021 Nicholas Christopher

This file is part of Quoter Migrator.

Quoter Migrator is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3.

Quoter Migrator is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Quoter.  If not, see <https://www.gnu.org/licenses/>.
*/

const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},
	prefix: String,
	allQuote: Boolean,
	maxGuildQuotes: Number,
	maxQuoteLength: Number,
	quotes: [
		{
			text: {
				type: String,
				required: true,
			},
			author: String,
			quoterID: String,
			editorID: String,
			ogMessageID: String,
			ogChannelID: String,
			createdTimestamp: {
				type: Number,
				min: 0,
				default: Date.now(),
			},
			editedTimestamp: {
				type: Number,
				min: 0,
			},
		},
	],
});

module.exports = model("Guild", guildSchema);
