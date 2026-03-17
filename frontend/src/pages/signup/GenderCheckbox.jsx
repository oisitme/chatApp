const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className='mt-5 flex gap-3'>
			<div className='form-control'>
				<label
					className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
						selectedGender === "male"
							? "border-teal-400/50 bg-teal-400/[0.14] text-slate-100"
							: "border-white/10 bg-white/[0.04] text-slate-300"
					}`}
				>
					<span>Male</span>
					<input
						type='checkbox'
						className='checkbox checkbox-sm border-slate-700'
						checked={selectedGender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label
					className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
						selectedGender === "female"
							? "border-teal-400/50 bg-teal-400/[0.14] text-slate-100"
							: "border-white/10 bg-white/[0.04] text-slate-300"
					}`}
				>
					<span>Female</span>
					<input
						type='checkbox'
						className='checkbox checkbox-sm border-slate-700'
						checked={selectedGender === "female"}
						onChange={() => onCheckboxChange("female")}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;

// STARTER CODE FOR THIS FILE
// const GenderCheckbox = () => {
// 	return (
// 		<div className='flex'>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Male</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Female</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 		</div>
// 	);
// };
// export default GenderCheckbox;
