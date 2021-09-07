package beans;


public class WorkingHours {
	private int dayOfWeek; // 1 - Sunday, 7 - Saturday
	private String startTime;
	private String endTime;
	private boolean closed;
	
	public WorkingHours() {}
	
	public WorkingHours(int dayOfWeek, String startTime, String endTime, boolean closed) {
		super();
		this.dayOfWeek = dayOfWeek;
		this.startTime = startTime;
		this.endTime = endTime;
		this.closed = closed;
	}

	public int getDayOfWeek() {
		return dayOfWeek;
	}

	public void setDayOfWeek(int dayOfWeek) {
		this.dayOfWeek = dayOfWeek;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public boolean isClosed() {
		return closed;
	}

	public void setClosed(boolean closed) {
		this.closed = closed;
	}
	
}
