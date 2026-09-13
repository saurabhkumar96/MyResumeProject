import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import {
    Search,
    MapPin,
    BriefcaseBusiness,
    Building2,
    ExternalLink,
    ChevronRight,
    Clock3,
} from "lucide-react";

import { useFindJob } from "../hooks/useFindJob";

const Home = () => {
    const { caterogy, loading, listofjob } = useFindJob();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = useMemo(() => {
        return [
            "All",
            ...new Set(
                caterogy?.filter((item) => item !== "All others") || []
            ),
        ];
    }, [caterogy]);

    const filteredJobs = useMemo(() => {
        if (!listofjob) return [];

        return listofjob.filter((job) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                job.title?.toLowerCase().includes(searchText) ||
                job.company_name?.toLowerCase().includes(searchText) ||
                job.category?.toLowerCase().includes(searchText) ||
                job.candidate_required_location
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesCategory =
                selectedCategory === "All" ||
                job.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [listofjob, search, selectedCategory]);

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <main className="min-h-screen bg-slate-50">

            {/* ================= HEADER ================= */}
            <header className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                    <div className="mb-6">
                        <p className="mb-2 text-sm font-medium text-blue-600">
                            Find your next opportunity
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Find a job you'll love
                        </h1>

                        <p className="mt-2 max-w-2xl text-slate-500">
                            Discover remote and local opportunities from companies
                            around the world.
                        </p>
                    </div>

                    {/* ================= SEARCH ================= */}
                    <div className="flex flex-col gap-3 md:flex-row">

                        <div className="relative flex-1">
                            <Search
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search jobs, companies, skills..."
                                className="
                                    h-14 w-full rounded-xl border border-slate-200
                                    bg-white pl-12 pr-4 text-sm outline-none
                                    transition
                                    placeholder:text-slate-400
                                    focus:border-blue-500
                                    focus:ring-4 focus:ring-blue-500/10
                                "
                            />
                        </div>

                        <button
                            className="
                                h-14 rounded-xl bg-blue-600 px-7
                                font-semibold text-white
                                shadow-sm transition
                                hover:bg-blue-700
                                active:scale-[0.98]
                            "
                        >
                            Search Jobs
                        </button>
                    </div>
                </div>
            </header>

            {/* ================= CONTENT ================= */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* ================= CATEGORIES ================= */}
                <section className="mb-8">

                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Browse by category
                            </h2>

                            <p className="text-sm text-slate-500">
                                Explore jobs based on your interests
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((category) => {
                            const active =
                                selectedCategory === category;

                            return (
                                <button
                                    key={category}
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                    className={`
                                        whitespace-nowrap rounded-full
                                        px-4 py-2 text-sm font-medium
                                        transition
                                        ${
                                            active
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                                        }
                                    `}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* ================= JOB HEADER ================= */}
                <div className="mb-5 flex items-end justify-between">

                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Latest jobs
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {filteredJobs.length}{" "}
                            {filteredJobs.length === 1
                                ? "job"
                                : "jobs"}{" "}
                            found
                        </p>
                    </div>

                    <div className="hidden text-sm text-slate-500 sm:block">
                        Sorted by latest
                    </div>
                </div>

                {/* ================= JOB LIST ================= */}
                {filteredJobs.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid gap-4">

                        {filteredJobs.map((job) => (
                            <JobCard
                                key={job.id || job.url}
                                job={job}
                            />
                        ))}

                    </div>
                )}
            </div>
        </main>
    );
};


/* =========================================================
   JOB CARD
========================================================= */

const JobCard = ({ job }) => {
    const description = job.description
        ?.replace(/<[^>]*>/g, "")
        ?.replace(/&nbsp;/g, " ")
        ?.trim();

    return (
        <article
            className="
                group rounded-2xl border border-slate-200
                bg-white p-5
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-blue-200
                hover:shadow-lg
            "
        >

            <div className="flex flex-col gap-5 sm:flex-row">

                {/* ================= LOGO ================= */}
                <div
                    className="
                        flex h-14 w-14 shrink-0 items-center
                        justify-center overflow-hidden
                        rounded-xl border border-slate-100
                        bg-slate-50
                    "
                >
                    {job.company_logo ? (
                        <img
                            src={job.company_logo}
                            alt={`${job.company_name} logo`}
                            className="h-full w-full object-contain p-2"
                        />
                    ) : (
                        <Building2
                            size={25}
                            className="text-slate-400"
                        />
                    )}
                </div>

                {/* ================= MAIN CONTENT ================= */}
                <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                            <h3
                                className="
                                    text-lg font-bold text-slate-900
                                    transition group-hover:text-blue-600
                                "
                            >
                                {job.title}
                            </h3>

                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                                <Building2 size={15} />
                                <span>{job.company_name}</span>
                            </div>
                        </div>

                        {/* Job Type */}
                        {job.job_type && (
                            <span
                                className="
                                    w-fit rounded-full
                                    bg-emerald-50 px-3 py-1
                                    text-xs font-semibold
                                    text-emerald-700
                                "
                            >
                                {job.job_type}
                            </span>
                        )}
                    </div>

                    {/* ================= META ================= */}
                    <div className="mt-4 flex flex-wrap gap-2">

                        {job.candidate_required_location && (
                            <MetaBadge
                                icon={<MapPin size={14} />}
                                text={job.candidate_required_location}
                            />
                        )}

                        {job.category && (
                            <MetaBadge
                                icon={<BriefcaseBusiness size={14} />}
                                text={job.category}
                            />
                        )}

                    </div>

                    {/* ================= DESCRIPTION ================= */}
                    {description && (
                        <p
                            className="
                                mt-4 line-clamp-2
                                text-sm leading-6
                                text-slate-500
                            "
                        >
                            {description}
                        </p>
                    )}

                    {/* ================= TAGS ================= */}
                    {job.tags?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {job.tags.slice(0, 6).map((tag, index) => (
                                <span
                                    key={`${tag}-${index}`}
                                    className="
                                        rounded-md bg-slate-100
                                        px-2.5 py-1
                                        text-xs font-medium
                                        text-slate-600
                                    "
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* ================= FOOTER ================= */}
                    <div
                        className="
                            mt-5 flex flex-col gap-3
                            border-t border-slate-100 pt-4
                            sm:flex-row sm:items-center
                            sm:justify-between
                        "
                    >

                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Clock3 size={14} />
                            <span>Job opportunity</span>
                        </div>

                        <Link
                            to={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex items-center justify-center
                                gap-2 rounded-lg
                                bg-slate-900 px-4 py-2.5
                                text-sm font-semibold text-white
                                transition
                                hover:bg-blue-600
                            "
                        >
                            View job
                            <ExternalLink size={15} />
                        </Link>

                    </div>
                </div>
            </div>
        </article>
    );
};


/* =========================================================
   META BADGE
========================================================= */

const MetaBadge = ({ icon, text }) => {
    return (
        <span
            className="
                inline-flex items-center gap-1.5
                rounded-md bg-slate-50
                px-2.5 py-1.5
                text-xs font-medium
                text-slate-600
            "
        >
            {icon}
            {text}
        </span>
    );
};


/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = () => {
    return (
        <div
            className="
                flex min-h-[300px] flex-col
                items-center justify-center
                rounded-2xl border border-dashed
                border-slate-300 bg-white
                px-6 text-center
            "
        >
            <div
                className="
                    mb-4 flex h-14 w-14
                    items-center justify-center
                    rounded-full bg-slate-100
                "
            >
                <Search
                    size={25}
                    className="text-slate-400"
                />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
                No jobs found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
                Try changing your search or selecting another category.
            </p>
        </div>
    );
};


/* =========================================================
   LOADING
========================================================= */

const LoadingSkeleton = () => {
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                    <div className="mt-3 h-10 w-80 animate-pulse rounded bg-slate-200" />
                    <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-200" />
                </div>

                <div className="mb-8 h-14 animate-pulse rounded-xl bg-slate-200" />

                <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="
                                h-52 animate-pulse
                                rounded-2xl bg-white
                                shadow-sm
                            "
                        />
                    ))}
                </div>

            </div>
        </main>
    );
};

export default Home;