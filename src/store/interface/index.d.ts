/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	isGrey: boolean;
	isWeak: boolean;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}


/* userState */
export interface userState {
	token: string;
	userInfo: any;
	// assemblySize: string;
	// language: string;
	// themeConfig: ThemeConfigProp;
}
