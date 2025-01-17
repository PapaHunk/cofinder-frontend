import * as React from "react";
import { useNavigate } from "react-router-dom";
import { SectionsBrowserType } from "data/dbTypes";
import { useFetchSpecificSectionData } from "../../hooks/useFetchTermData";
import { FETCH } from "hooks/useFetchTermData";
import { ROUTE } from "../../routes";

export default function MyCourses() {
	const navigate = useNavigate();

	const schedule = useFetchSpecificSectionData({
		fetch: FETCH.SpecificSections,
	});

	return (
		<div>
			<h2 className="mb-6 font-medium font-serif dark:text-white">My Courses</h2>
			{schedule && schedule.sections?.length > 0 ? (
				<div className="grid 3xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
					{schedule.sections.map((section: SectionsBrowserType) => (
						<SectionItem key={section.crn} section={section} />
					))}
				</div>
			) : (
				<>
					<div className="mt-4 px-4 text-center border-dashed border-4 bg-slate-100 dark:bg-slate-800 bg-opacity-40 border-slate-300 dark:border-slate-700 rounded-xl h-80 flex place-items-center justify-center">
						<div>
							<span className="material-icons text-gray-400 dark:text-slate-300 text-opacity-40 text-6xl font-bold">
								category
							</span>
							<p className="text-lg text-gray-900 dark:text-white font-medium mt-4">
								You have no course added.
							</p>
							<p className="text-[0.95rem] leading-6 text-gray-600 dark:text-slate-400 mt-2 lg:w-2/3 mx-auto">
								Select a course and we will take care of the rest. Start
								now!
							</p>
							<br />
							<button
								onClick={() => {
									navigate(ROUTE.CourseBrowser);
								}}
								className="tw-animate-to-90-parent bg-accent-700 px-4 pr-4 py-1.5 align-top font-medium text-white rounded-lg shadow-lg hover:bg-accent-800"
							>
								<span className="tw-animate-to-90 material-icons align-middle text-white text-base">
									add
								</span>
								<span className="align-middle ml-2 text-base font-medium">
									Add Course
								</span>
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
export function getColor(s: string): string {
	let sum = 0;
	let colors = [
		"#DFE1F5",
		"#FFDEDE",
		"#FFFCD9",
		"#DDEDEA",
		"#DAEAF6",
		"#FFE6CA",
		"#F2DCFF",
	];
	for (let i = 0; i < s.length; i++) {
		sum += s.charCodeAt(i);
	}
	let result = sum % colors.length;
	return colors[result];
}
function SectionItem({ section }: { section: SectionsBrowserType }) {
	let color: string = getColor(section.subject_id);
	return (
		<div className="bg-white dark:bg-slate-800 border-[0.025rem] border-gray-400 dark:border-slate-600 border-opacity-30 shadow-sm">
			<div
				className={
					"tw-gradient-br-" +
					color.replace("#", "") +
					" dark:tw-gradient-br-" +
					color.replace("#", "") +
					" h-24 w-24 px-4 pt-4"
				}
				// style={{
				// 	background: `linear-gradient(to bottom right, ${color}, #fff 70%)`,
				// }}
			></div>
			<div className="z-10 px-4 pb-3 -mt-20">
				<div className="font-bold text-[1.125rem] dark:text-slate-100 leading-[1.125rem]">
					{section.is_lab ? (
						<span
							style={{ color: color }}
							className="mr-1.5 bg-black bg-opacity-80 align-top px-1 rounded text-[0.8rem] font-medium"
						>
							LAB
						</span>
					) : (
						<></>
					)}
					{section.subject_id} {section.course.code}
					{" - "}
					{section.name}
				</div>
				<div className="mt-1.5">
					<p className="mt-1 text-gray-700 dark:text-slate-300 leading-[1.125rem]">
						<span className="block uppercase text-[0.9rem] font-bold">
							{section.course.name}
						</span>
						<span className="mt-2 block leading-[1.125rem] text-[0.925rem] text-gray-800 dark:text-slate-300">
							{section.instructor}
						</span>
					</p>
					<p className="mt-3">
						<span className="bg-gray-300 dark:bg-slate-700 dark:text-slate-100 bg-opacity-70 text-[0.9rem] text-gray-900 px-1 rounded">
							{section.crn}
						</span>
						<span className="pl-1"></span>{" "}
						<span className="bg-gray-300 dark:bg-slate-700 dark:text-slate-100 bg-opacity-70 text-[0.9rem] text-gray-900 px-1 rounded">
							Credits: {section.course.credits}
						</span>
						<span className="pl-1"></span>{" "}
						<span className="bg-gray-300 dark:bg-slate-700 dark:text-slate-100 bg-opacity-70 text-[0.9rem] text-gray-900 px-1 rounded">
							{section.subject}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
